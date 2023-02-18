import { Popover, Portal, Tab } from "@headlessui/react";
import React, { Fragment, useMemo } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import {
  MdPersonOutline,
  MdOutlineSettings,
  MdPrivateConnectivity,
  MdHistory,
} from "react-icons/md";
import { DefaultPopoverTransition, DefaultPopoverPanel } from "../../Popover";
import Image from "next/image";
import IconButton from "../../IconButton/IconButton";
import { RxPerson } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout, selectUser } from "@/store/auth";
import { getRoleText } from "@/lib/common/utils/getRole";
import classNames from "classnames";
import Link from "next/link";

export function ProfilePopover() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const roleText = useMemo(() => {
    if (!user) return "Guest";

    return getRoleText(user);
  }, [user]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  {
    /* Edit profile, view profile, billing, logout */
  }
  const profileLinks = [
    { text: "Edit Profile", href: "", icon: MdPersonOutline },
    { text: "View Profile", href: "/profile", icon: MdPersonOutline },
    { text: "Billing", href: "", icon: MdOutlineSettings },
    {
      text: "Logout",
      icon: IoLogOutOutline,
      onClick: () => {
        dispatch(logout());
      },
    },
  ];

  //Support Account Settings Privacy Center Feedback History
  const settingsLinks = [
    { text: "Account Settings", href: "", icon: MdOutlineSettings },
    { text: "Privacy Center", href: "", icon: MdPrivateConnectivity },
    { text: "Feedback", href: "", icon: MdPersonOutline },
    { text: "History", href: "", icon: MdHistory },
  ];

  const renderLink = (link: typeof profileLinks[0]) => {
    return (
      <Link
        href={link.href || "#"}
        key={link.text}
        className="flex items-center gap-2 p-3 text-sm text-gray-400 transition hover:bg-sky-100 hover:text-gray-500"
        onClick={link.onClick}
      >
        <link.icon size={24} />
        <span>{link.text}</span>
      </Link>
    );
  };

  return (
    <Popover className="relative">
      <Popover.Button ref={buttonRef}>
        <IconButton noBg icon={RxPerson} text={user?.name}></IconButton>
      </Popover.Button>
      <Portal>
        <DefaultPopoverTransition>
          <DefaultPopoverPanel buttonRef={buttonRef}>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <div className="relative aspect-square h-10 overflow-hidden rounded-full">
                    <Image
                      src={user?.avatar_path || "/assets/avatar.svg"}
                      fill
                      alt="logo"
                    />
                  </div>
                  <div className="grid text-sm">
                    <Link
                      href="/profile"
                      className="truncate text-base font-semibold"
                    >
                      {user?.name}
                    </Link>
                    <span className="text-gray-400">{roleText}</span>
                  </div>
                </div>

                <span
                  className="cursor-pointer"
                  onClick={() => dispatch(logout())}
                >
                  <IoLogOutOutline size="1.5rem" />
                </span>
              </div>
              <Tab.Group as={Fragment}>
                <Tab.List className="flex text-sm">
                  <Tab className="flex flex-1 items-center justify-center gap-1 p-2 outline-none">
                    {({ selected }) => (
                      <TabContainer selected={selected}>
                        <>
                          <MdPersonOutline size={25} />
                          <span>Profile</span>
                        </>
                      </TabContainer>
                    )}
                  </Tab>
                  <Tab className="flex flex-1 items-center justify-center gap-1 p-2 outline-none">
                    {({ selected }) => (
                      <TabContainer selected={selected}>
                        <>
                          <MdOutlineSettings size={25} />
                          <span>Settings</span>
                        </>
                      </TabContainer>
                    )}
                  </Tab>
                </Tab.List>
                <Tab.Panels as="div" className="">
                  <Tab.Panel as="div" className={classNames("")}>
                    {profileLinks.map(renderLink)}
                  </Tab.Panel>
                  <Tab.Panel>{settingsLinks.map(renderLink)}</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </DefaultPopoverPanel>
        </DefaultPopoverTransition>
      </Portal>
    </Popover>
  );
}

const TabContainer = ({
  children,
  selected,
  className,
}: {
  children: React.ReactElement;
  selected: boolean;
  className?: string;
}) => {
  const classes = classNames(
    "flex flex-1 items-center justify-center gap-1",
    {
      "text-blue-500": selected,
      "text-gray-400": !selected,
    },
    className
  );
  return <div className={classes}>{children}</div>;
};
