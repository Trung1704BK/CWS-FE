import Modal from "@/components/common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectIsDeleteModalOpen,
  hideDeleteModal,
  selectDeleteGroup,
} from "@/store/groupPage";
import classNames from "classnames";
import toast from "react-hot-toast";
import { deleteGroup } from "@/lib/admin/groups";
import { queryClient } from "@/core/queryClient";
import { Button } from "@chakra-ui/react";
function BlockGroupModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsDeleteModalOpen);
  const group = useAppSelector(selectDeleteGroup);
  const toggle = () => dispatch(hideDeleteModal());
  const onDeleteClicked = () => {
    if (!group) return;
    toast.promise(deleteGroup(group.id),{
      loading: "Deleting...",
      success: () => {
        toggle();
        queryClient.invalidateQueries(["groups"]);
        return `Group deleted: ${group.name}`;
      },
      error: (err) => {
        return `Error: ${err?.message}`;
      },
    });
  };
  return (
    <Modal title="Delete Group" isOpen={isOpen} onClose={toggle}>
      <p className="text-sm">
        Are you sure you want to delete this group? This action cannot be
        undone.
        <br />
        {group && (
          <div
            className={classNames(
              "rounded-md border border-dashed border-blue-200 p-3",
              "flex items-center gap-2",
              "mt-3"
            )}
          >
            <img
              src={group.avatar_url}
              className="aspect-square w-14 rounded-xl"
              alt="avatar"
            />
            <span className="font-semibold">{group.name}</span>
          </div>
        )}
      </p>
      <Modal.Bottom withCloseButton toggle={toggle}>
        <Button colorScheme="red" onClick={onDeleteClicked}>
          Block
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}

export default BlockGroupModal;
