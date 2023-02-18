import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
} & React.ComponentProps<typeof ChakraModal>;

function Modal({ children, title, ...rest }: Props) {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent maxW="3xl">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody pb={20}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}

Modal.Bottom = function Bottom({
  children,
  leftButtons,
  withCloseButton,
  toggle,
}: {
  children?: React.ReactNode;
  leftButtons?: React.ReactNode;
  withCloseButton?: boolean;
  toggle?: () => void;
}) {
  return (
    <div className="h-16">
      <div className="absolute inset-x-0 bottom-0 mt-6 flex w-full justify-between bg-gray-100 p-4">
        <div>{leftButtons}</div>
        <div className="flex justify-end space-x-2">
          {children}

          {withCloseButton && toggle && <Button onClick={toggle}>Close</Button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
