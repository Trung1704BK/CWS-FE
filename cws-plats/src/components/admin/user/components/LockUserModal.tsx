import Modal from "@/components/common/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectIsLockModalOpen, toggleLockModal } from "@/store/userPage";
import { Button } from "@chakra-ui/react";
import React from "react";

function LockUserModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsLockModalOpen);

  const toggle = () => dispatch(toggleLockModal());

  return (
    <Modal title="Lock user" isOpen={isOpen} onClose={toggle}>
      Hi there
      <Modal.Bottom withCloseButton toggle={toggle}>
        <Button colorScheme="red">Lock</Button>
      </Modal.Bottom>
    </Modal>
  );
}

export default LockUserModal;
