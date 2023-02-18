import { Spinner } from "@/components/common";
import AppPagination from "@/components/common/AppPagination/AppPagination";
import AppTable from "@/components/common/AppTable/AppTable";
import Center from "@/components/common/Center/Center";
import { Reward } from "@/lib/admin/rewards";
import { useFetchRewards } from "@/lib/admin/rewards/queries";
import { openLightBox } from "@/store/lightBox";
import {
  showDeleteModal,
  showEditModal,
  toggleCreateModal,
} from "@/store/rewardPage";
import { rootStore, useAppDispatch } from "@/store/store";
import { Heading, Button } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { IoLockClosed } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import CreateRewardModal from "./components/CreateRewardModal";
import DeleteRewardModal from "./components/DeleteRewardModal";
import EditAssetsModal from "./components/EditRewardModal";

export const assetsColumnDef: ColumnDef<Reward>[] = [
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
    footer: (props) => props.column.id,
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="relative aspect-square w-20 overflow-hidden rounded-full">
          <Image
            src={info.row.original.image}
            fill
            alt={info.row.original.name}
            className="cursor-pointer object-cover transition-all duration-300 hover:scale-110"
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
    accessorKey: "order",
    header: () => <span>Order</span>,
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
          Delete
        </Button>
      </div>
    ),
    footer: (props) => props.column.id,
  },
];

const LIMIT = 10;

function RewardPage() {
  const columns = React.useMemo(() => assetsColumnDef, []);
  const router = useRouter();
  const initialPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1;
  const [page, setPage] = useState<number>(initialPage);
  const { data, isLoading } = useFetchRewards({ page, limit: LIMIT });
  const dispatch = useAppDispatch();
  const onPageChange = useCallback(
    (page: number) => {
      setPage(page);

      // change url without reloading page
      Router.push("/admin/rewards?page=" + page, undefined, { shallow: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between space-x-2">
          <Heading size="lg">Assets</Heading>

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
            <AppTable data={data.data} columns={columns} />

            <AppPagination
              onChange={onPageChange}
              total={data.total}
              pageSize={LIMIT}
              current={page}
            />
          </>
        )}
        <DeleteRewardModal />
        <EditAssetsModal />
        <CreateRewardModal />
      </div>
    </>
  );
}

export default RewardPage;
