import React from "react";

type Props = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;

function Center({ children, ...rest }: Props) {
  return (
    <div {...rest} className="flex items-center justify-center">
      {children}
    </div>
  );
}

export default Center;
