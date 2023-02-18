import classNames from "classnames";
import React from "react";

type Props = {
  isRequired?: boolean;
} & React.ComponentPropsWithoutRef<"label">;

function Label({ children, className, isRequired, ...rest }: Props) {
  return (
    <label
      className={classNames("px-1 text-sm text-gray-600", className)}
      {...rest}
    >
      {children}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );
}

export default Label;
