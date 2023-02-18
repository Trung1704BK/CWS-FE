import { ProfilePopover } from "./ProfilePopover";
import { Popover } from "@headlessui/react";
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";
import IconButton from "../../IconButton/IconButton";
import NotificationPopover from "./NotificationPopover";

function RightPopovers() {
  return (
    <Popover.Group className="flex space-x-2  " >
      <NotificationPopover />

      <IconButton  icon={MdOutlineMessage } ></IconButton>
      <IconButton
        icon={MdOutlineSettings}
        className="hidden md:flex w-11"
      ></IconButton>

      <ProfilePopover />
    </Popover.Group>
  );
}

export default RightPopovers;
