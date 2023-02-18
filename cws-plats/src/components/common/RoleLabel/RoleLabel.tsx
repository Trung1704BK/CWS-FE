import classNames from "classnames";
import React from "react";

type Props = {
  label: string;
  bg: string;
  color: string;
};

function RoleLabel({ label, bg, color }: Props) {
  return (
    <span
      className={classNames(
        "rounded-full px-2 py-1 text-xs font-medium",
        bg,
        color
      )}
    >
      {label}
    </span>
  );
}

export default RoleLabel;
