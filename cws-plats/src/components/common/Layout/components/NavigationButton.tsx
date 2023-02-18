import classNames from "classnames";
import { memo } from "react";
import { IconType } from "react-icons";
import { RxLinkNone1 } from "react-icons/rx";

type Props = { className: string; onClick?: VoidFunction; icon?: IconType };

function NavigationButton({ className, onClick, icon }: Props) {
  const Icon = icon || RxLinkNone1;

  return (
    <a onClick={onClick} className="block">
      <div
        className={classNames(
          "aspect-square w-14 transform cursor-pointer rounded-xl bg-red-400 p-2 transition duration-300 ease-in-out hover:scale-110",
          className
        )}
      >
        {Icon && <Icon className="h-full w-full p-2" color="white" />}
      </div>
    </a>
  );
}

export default memo(NavigationButton);
