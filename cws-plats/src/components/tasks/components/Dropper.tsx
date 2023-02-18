import classNames from "classnames";
import React from "react";

type Props = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;

function Dropper({ children, className, ...rest }: Props) {
  return (
    <div
      className={classNames(
        "h-28 w-64 rounded-xl border border-dashed border-sky-300 bg-sky-100 p-2",
        "flex items-center justify-center",
        "space-x-2 text-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Dropper;
