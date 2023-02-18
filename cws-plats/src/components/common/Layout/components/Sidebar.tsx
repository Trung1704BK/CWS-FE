import { RxDropdownMenu } from "react-icons/rx";
import IconButton from "../../IconButton/IconButton";
import RightPopovers from "./RightPopovers";

export function Sidebar({
  toggleIsCollapsed,
}: {
  toggleIsCollapsed: () => void;
}) {
  return (
    <div className="h-18 sticky inset-x-0 top-0 z-40 w-full border-b bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        <IconButton icon={RxDropdownMenu} onClick={toggleIsCollapsed} />

        <RightPopovers />
      </div>
    </div>
  );
}
