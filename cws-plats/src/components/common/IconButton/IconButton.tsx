import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  text?: string;
  noBg?: boolean;
} & React.ComponentPropsWithoutRef<"a">;

function IconButton({ icon, text, noBg = false, className, ...rest }: Props) {
  const Icon = icon;
  return (
    <a
      className={classNames(
        "flex cursor-pointer items-center justify-center rounded-md transition",
        "space-x-2",
        "h-12",
        text ? "px-3" : "aspect-square",
        noBg ? "hover:bg-transparent" : "bg-gray-200 hover:bg-gray-300",
        "font-semibold",
        className
      )}
      {...rest}
    >
      <Icon size={19} />

      {text && <span className="truncate text-sm">{text}</span>}
    </a>
  );
}

export default IconButton;
