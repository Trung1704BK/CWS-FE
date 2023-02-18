import { Transition } from "@headlessui/react";
import React from "react";

const DefaultPopoverTransition = ({
  children,
  show,
}: {
  children: React.ReactElement;
  show?: boolean;
}) => {
  // This transition is used to display the popover when it is open.
  // The transition is set to `opacity: 0` when the popover is not open,
  // and `opacity: 1` when it is open.
  return (
    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      show={show}
    >
      {children}
    </Transition>
  );
};

export default DefaultPopoverTransition;
