import { Spinner } from "@/components/common";
import AppPagination from "@/components/common/AppPagination/AppPagination";
import AppTable from "@/components/common/AppTable/AppTable";
import Center from "@/components/common/Center/Center";
import { useFetchEvents } from "@/lib/admin/events/queries";
import { Event } from "@/lib/admin/events";
import { openLightBox } from "@/store/lightBox";
import { rootStore } from "@/store/store";
import { Button, Heading } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import CreateEventModal from "./components/CreateEventModal";
import DeleteEventModal from "./components/DeleteEventModal";
import EditEventModal from "./components/EditEventModal";
import EventProvider, { useEventContext } from "./context";

const LIMIT = 10;

function EventPage() {
  const { dispatch } = useEventContext();
  const columns = React.useMemo<ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="relative aspect-square w-20 overflow-hidden rounded-full">
              <Image
                src={info.row.original.task?.cover_url}
                fill
                alt={info.row.original.name}
                className="cursor-pointer object-cover transition-all duration-300 hover:scale-110"
                onClick={() => {
                  rootStore.dispatch(
                    openLightBox({
                      image: info.row.original.task.cover_url,
                      title: info.row.original.name,
                    })
                  );
                }}
              />
            </div>
            <span>{info.row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: () => "Description",
        cell: (info) => info.row.original.description,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "max_job",
        header: () => <span>Max Job</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
        cell: (info) => {
          const statusText = !info.row.original.status ? "Draft" : "Public";
          const bgColor = !info.row.original.status
            ? "bg-gray-200"
            : "bg-lime-100";
          const squareBgColor = !info.row.original.status
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
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                dispatch({ type: "EDIT_EVENT", payload: info.row.original });
              }}
              size="sm"
              leftIcon={<RxEyeOpen />}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "DELETE_EVENT", payload: info.row.original });
              }}
              colorScheme="red"
              size="sm"
              leftIcon={<IoLockClosed />}
            >
              Delete
            </Button>
          </div>
        ),
        footer: (props) => props.column.id,
      },
    ],
    [dispatch]
  );
  const router = useRouter();
  const initialPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1;
  const [page, setPage] = useState<number>(initialPage);
  const { data, isLoading } = useFetchEvents({ page, limit: LIMIT });
  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

      // change url without reloading page
      Router.push("/admin/events?page=" + page, undefined, { shallow: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-x-2">
          <Heading size="lg">Events</Heading>

          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => {
              dispatch({ type: "TOGGLE_CREATE_EVENT", payload: null });
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
            <AppTable data={data.data} columns={columns} />

            <AppPagination
              onChange={onPageChange}
              total={data.total}
              pageSize={LIMIT}
              current={page}
            />
          </>
        )}
        <DeleteEventModal />
        <EditEventModal />
        <CreateEventModal />
      </div>
    </>
  );
}

export default function EventPageWrapper() {
  return (
    <EventProvider>
      <EventPage />
    </EventProvider>
  );
}
