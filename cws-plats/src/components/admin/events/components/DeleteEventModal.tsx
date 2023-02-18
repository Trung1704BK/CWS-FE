import Modal from "@/components/common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectIsDeleteModalOpen,
  hideDeleteModal,
  selectDeleteReward,
} from "@/store/rewardPage";
import classNames from "classnames";
import toast from "react-hot-toast";
import { deleteReward } from "@/lib/admin/rewards";
import { queryClient } from "@/core/queryClient";
import { Button } from "@chakra-ui/react";

function DeleteEventModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsDeleteModalOpen);
  const reward = useAppSelector(selectDeleteReward);

  const toggle = () => dispatch(hideDeleteModal());

  const onDeleteClicked = () => {
    if (!reward) return;

    toast.promise(deleteReward(reward.id),{
      loading: "Deleting...",
      success: () => {
        toggle();
        queryClient.invalidateQueries(["rewards"]);
        return `Reward deleted: ${reward.name}`;
      },
      error: (err) => {
        return `Error: ${err?.message}`;
      },
    });
  };

  return (
    <Modal title="Delete reward" isOpen={isOpen} onClose={toggle}>
      <p className="text-sm">
        Are you sure you want to delete this reward? This action cannot be
        undone.
        <br />
        {reward && (
          <div
            className={classNames(
              "rounded-md border border-dashed border-blue-200 p-3",
              "flex items-center gap-2",
              "mt-3"
            )}
          >
            <img src={reward.image} className="aspect-square w-14 rounded-xl" alt="" />
            <span className="font-semibold">{reward.name}</span>
          </div>
        )}
      </p>
      <Modal.Bottom withCloseButton toggle={toggle}>
        <Button colorScheme="red" onClick={onDeleteClicked}>
          Delete
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}

export default DeleteEventModal;
