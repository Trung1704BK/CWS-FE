import client, { getApiUrl } from "@/core/client";
import { queryClient } from "@/core/queryClient";
import { useFetchTasks } from "@/lib/tasks/queries";
import { Task } from "@/lib/tasks/types";
import { openLightBox } from "@/store/lightBox";
import { rootStore } from "@/store/store";
import { Heading, Button } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { IoLockClosed } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import { AppPagination, Modal, Spinner } from "../common";
import AppTable from "../common/AppTable/AppTable";
import Center from "../common/Center/Center";

const LIMIT = 10;

function TaskPage() {
  const router = useRouter();
  const assetsColumnDef: ColumnDef<Task>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
        cell: (info) => (
          <div className="flex max-w-[15rem] items-center gap-3">
            <div className="relative aspect-square w-20 overflow-hidden rounded-xl ">
              <Image
                src={info.row.original.image}
                fill
                alt={info.row.original.name}
                className="transform cursor-pointer object-cover transition hover:scale-110"
                onClick={() => {
                  rootStore.dispatch(
                    openLightBox({
                      image: info.row.original.image,
                      title: info.row.original.name,
                    })
                  );
                }}
              />
            </div>
            <span
              className="truncate text-sm font-semibold"
              title={info.row.original.name}
            >
              {info.row.original.name}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: () => "Description",
        cell: (info) => (
          <div className="max-w-[15rem] whitespace-pre-wrap line-clamp-5">
            {info.row.original.description.replaceAll("\\n", "\n")}
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "post_by",
        header: () => "Posted By",
        cell: (info) => info.row.original.post_by,
      },
      {
        accessorKey: "socials",
        header: () => <span>Social</span>,
        footer: (props) => props.column.id,
        cell: (info) => (
          <span>
            {info.row.original.socials?.map((task) => (
              <span key={task.id}>{task.name}</span>
            ))}
            {info.row.original.socials?.length === 0 ? (
              <span className="text-gray-500">None</span>
            ) : (
              info.row.original.socials?.length > 4 && (
                <span className="text-gray-500">
                  + {info.row.original.socials?.length - 4} more...
                </span>
              )
            )}
          </span>
        ),
      },
      {
        accessorKey: "checkin_tasks",
        header: () => <span>Check-in</span>,
        footer: (props) => props.column.id,
        cell: (info) => (
          <div className="max-w-[13rem]">
            <div className="truncate line-clamp-4">
              {info.row.original.locations?.map((task) => (
                <div key={task.id}>{task.name}</div>
              ))}
            </div>{" "}
            {/* show add n-4 more... */}
            {info.row.original.locations?.length > 4 && (
              <div className="text-gray-500">
                + {info.row.original.locations?.length - 4} more...
              </div>
            )}
          </div>
        ),
      },

      {
        accessorKey: "status",
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
        cell: (info) => {
          const statusText =
            info.row.original.status.toString() === "0" ? "Draft" : "Public";
          const bgColor =
            info.row.original.status.toString() === "0"
              ? "bg-gray-200"
              : "bg-lime-100";
          const squareBgColor =
            info.row.original.status.toString() === "0"
              ? "bg-gray-400"
              : "bg-green-500";
          return (
            <div
              className={classNames(
                "inline-flex items-center gap-0.5 space-x-1 rounded-full py-1 px-4 text-sm",
                bgColor
              )}
            >
              <div
                className={classNames("h-2 w-2 rounded-full", squareBgColor)}
              />
              <span>{statusText}</span>
            </div>
          );
        },
      },
      {
        header: "Action",
        id: "action",
        cell: (info) => {
          return (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => {
                  router.push("/tasks/edit/" + info.row.original.id);
                }}
                size="sm"
                leftIcon={<RxEyeOpen />}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteTaskId(info.row.original.id);
                }}
                colorScheme="red"
                size="sm"
                leftIcon={<IoLockClosed />}
              >
                Delete
              </Button>
            </div>
          );
        },
        footer: (props) => props.column.id,
      },
    ],
    [router]
  );
  const columns = React.useMemo(() => assetsColumnDef, [assetsColumnDef]);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useFetchTasks({ limit: LIMIT, page: page });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const onPageChange = (page: number) => {
    router.push(`/tasks?page=${page}`, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  useEffect(() => {
    if (router.query.page) {
      setPage(Number(router.query.page));
    }
  }, [router.query.page]);

  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <Heading size="lg">Tasks</Heading>
        <Button
          size="sm"
          onClick={() => {
            router.push("/tasks/new");
          }}
          colorScheme="blue"
        >
          Create New
        </Button>
      </div>
      <div className="h-3"></div>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        data?.data && (
          <>
            <AppTable columns={columns} data={data.data.data} />
            <AppPagination
              onChange={onPageChange}
              pageSize={LIMIT}
              total={data?.data.meta?.total}
              current={page}
            />
            <DeleteTaskModal
              isOpen={isDeleteModalOpen}
              toggleIsOpen={() => setIsDeleteModalOpen((state) => !state)}
              onDeleteClicked={() => {
                // GET: /api/tasks-cws/delete/{id}
                toast.promise(
                  client.get(
                    `${getApiUrl("action")}/tasks-cws/delete/${deleteTaskId}`
                  ),
                  {
                    loading: "Deleting...",
                    success: () => {
                      queryClient.invalidateQueries(["tasks"]);
                      return "Task deleted successfully";
                    },
                    error: "Failed to delete task",
                  }
                );

                setIsDeleteModalOpen(false);
                setDeleteTaskId(null);
              }}
            />
          </>
        )
      )}
    </div>
  );
}

const DeleteTaskModal = ({
  isOpen,
  toggleIsOpen,
  task,
  onDeleteClicked,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
  task?: Task;
  onDeleteClicked: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} title="Delete Task" onClose={toggleIsOpen}>
      <p className="text-sm">
        Are you sure you want to delete this group? This action cannot be
        undone.
        <br />
        {task && (
          <div
            className={classNames(
              "rounded-md border border-dashed border-blue-200 p-3",
              "flex items-center gap-2",
              "mt-3"
            )}
          >
            <img src={task.image} className="aspect-square w-14 rounded-xl" alt="image" />
            <span className="font-semibold">{task.name}</span>
          </div>
        )}
      </p>
      <Modal.Bottom withCloseButton toggle={toggleIsOpen}>
        <Button colorScheme="red" onClick={onDeleteClicked}>
          Delete
        </Button>
      </Modal.Bottom>
    </Modal>
  );
};
export default TaskPage;
