import { Sidebar } from "./components/Sidebar";
import React, { memo } from "react";
import classNames from "classnames";
import Navbar, { Category } from "./components/Navbar";
import { useToggle } from "react-use";
import { useIsMobile } from "../../../lib/common/hooks/useIsMobile";
import Link from "next/link";
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
type Props = { children: React.ReactElement };
function Layout({ children }: Props) {
  const categories: Category[] = [
    {
      label: "Tasks",
      icon: MdOutlineTask,
      items: [
        {
          label: "Task management",
          path: "/tasks",
        },
      ],
    },
    {
      label: "Admin Panel",
      icon: MdOutlineAdminPanelSettings,
      items: [
        {
          label: "Reward",
          path: "/admin/rewards",
        },
        {
          label: "User",
          path: "/admin/users",
          highlightLabel: "New",
        },
        {
          label: "Group",
          path: "/admin/groups",
          highlightLabel: "New",
        },
        {
          label: "Event",
          path: "/admin/events",
          highlightLabel: "New",
        },
      ],
    },
  ];
  const isMobile = useIsMobile();
  const [isCollapsed, toggleIsCollapsed] = useToggle(isMobile);
  return (
    <div className={classNames("flex h-[calc(100vh)] w-full bg-gray-50")}>
      <Navbar
        categories={categories}
        isCollapsed={isCollapsed}
        toggleIsCollapsed={toggleIsCollapsed}
      />
      <main className="relative w-full overflow-y-auto">
        <Sidebar toggleIsCollapsed={toggleIsCollapsed} />
        <div className="mx-auto w-full max-w-8xl overflow-x-auto overflow-y-auto py-2 px-4">
          {children}

          <div className="h-20"></div>

          <footer className="flex items-center justify-between text-sm">
            <p>&copy; All rights reserved</p>

            <div className="flex flex-wrap space-x-4">
              <Link
                href="/about-us"
                as="a"
                className="text-gray-500 hover:text-gray-700"
              >
                About us
              </Link>
              <Link
                href="/privacy-policy"
                as="a"
                className="text-gray-500 hover:text-gray-700"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                as="a"
                className="text-gray-500 hover:text-gray-700"
              >
                Terms
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default memo(Layout);
