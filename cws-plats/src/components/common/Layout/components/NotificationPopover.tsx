import { Heading } from "@chakra-ui/react";
import { Popover, Portal } from "@headlessui/react";
import React, { useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoGift } from "react-icons/io5";
import { RxCheckCircled } from "react-icons/rx";
import IconButton from "../../IconButton/IconButton";
import { DefaultPopoverTransition, DefaultPopoverPanel } from "../../Popover";

export default NotificationPopover;

function NotificationPopover() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover className="relative">
      <Popover.Button ref={buttonRef}>
        <IconButton icon={IoMdNotificationsOutline}></IconButton>
      </Popover.Button>
      <Portal>
        <DefaultPopoverTransition>
          <DefaultPopoverPanel buttonRef={buttonRef}>
            <div className="grid divide-y">
              <div className="flex items-center justify-between p-5">
                <Heading size="md">Notification</Heading>
                <RxCheckCircled className="text-green-500" />
              </div>

              <ul className="">
                <li className="flex items-center justify-between p-4">
                  <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-lime-200">
                    <IoGift />
                  </div>

                  <div className="text-sm">
                    <p>It&apos;s your birthday</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>

                  {/* time */}
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500">2:30 PM</span>
                  </div>
                </li>
                <li className="flex items-center justify-between border-t p-4">
                  <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-lime-200">
                    <IoGift />
                  </div>

                  <div className="text-sm">
                    <p>It&apos;s your birthday</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>

                  {/* time */}
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500">2:30 PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </DefaultPopoverPanel>
        </DefaultPopoverTransition>
      </Portal>
    </Popover>
  );
}
