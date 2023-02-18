import { Spinner } from "@/components/common";
import AppPagination from "@/components/common/AppPagination/AppPagination";
import AppTable from "@/components/common/AppTable/AppTable";
import { Group } from "@/lib/admin/groups";
import { toggleCreateModal } from "@/store/groupPage";
import { rootStore, useAppDispatch } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import CreateGroupModal from "./component/CreateGroupModal";
import classNames from "classnames";
import { RxEyeOpen } from "react-icons/rx";
import { IoLockClosed } from "react-icons/io5";
import EditGroupModal from "./component/EditGroupModal";
import DeleteGroupModal from "./component/BlockGroupModal";
import { showDeleteModal, showEditModal } from "@/store/groupPage/index";
import { openLightBox } from "@/store/lightBox";
import Center from "@/components/common/Center/Center";
import Link from "next/link";
import { useFetchGroups } from "@/lib/admin/group/queries";
import { Heading, Button } from "@chakra-ui/react";
export const assetsColumnDef: ColumnDef<Group>[] = [
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
    footer: (props) => props.column.id,
    cell: (info) => (
      <Link href={`/admin/groups/${info.row.original.id}`}>
        <div className="flex items-center gap-3">
          <div className="relative aspect-square w-20 overflow-hidden rounded-full">
            <Image
              src={info.row.original.avatar_url}
              fill
              alt={info.row.original.name}
              onClick={() => {
                rootStore.dispatch(
                  openLightBox({
                    image: info.row.original.avatar_url,
                    title: info.row.original.name,
                  })
                );
              }}
              className="transform cursor-pointer object-cover transition hover:scale-110"
            />
          </div>
          <span>{info.row.original.name}</span>
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "desc_en",
    header: () => "Description",
    cell: (info) => info.row.original.desc_en.slice(1, 20).concat("..."),
    footer: (props) => props.column.id,
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
          <div className={classNames("h-2 w-2 rounded-full", squareBgColor)} />
          <span>{statusText}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_user",
    header: () => <span>Total users</span>,
    cell: (info) => info.row.original.total_user,
    footer: (props) => props.column.id,
  },
  {
    header: "Action",
    id: "action",
    cell: (info) => (
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => {
            rootStore.dispatch(showEditModal(info.row.original));
          }}
          size="sm"
          leftIcon={<RxEyeOpen />}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            rootStore.dispatch(showDeleteModal(info.row.original));
          }}
          colorScheme="red"
          size="sm"
          leftIcon={<IoLockClosed />}
        >
         Block
        </Button>
      </div>
    ),
    footer: (props) => props.column.id,
  },
];

const LIMIT = 10;

function GroupPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchGroups({
    page,
    limit: LIMIT,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query.page]);

  const onPageChange = useCallback(
    (page: number) => {
      // change url without reloading page
      router.push("/admin/groups?page=" + page, undefined, {
        shallow: true,
      });
    },
    [router]
  );

  return (
    <>
      <div className="">
        <div className="flex items-center  justify-between space-x-2">
          <Heading size="lg">
            <span>Groups</span>
          </Heading>

          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => {
              dispatch(toggleCreateModal());
            }}
          >
            Create New
          </Button>
        </div>
        <div className="h-3"></div>
        {isLoading || !data ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <AppTable data={data.data} columns={assetsColumnDef} />

            <AppPagination
              onChange={onPageChange}
              total={(data.meta?.total || 0) * LIMIT}
              hideLeftTotal
              pageSize={LIMIT}
              current={page}
            />
          </>
        )}
        <CreateGroupModal />
        <EditGroupModal />
        <DeleteGroupModal />
      </div>
    </>
  );
}

export default GroupPage;
