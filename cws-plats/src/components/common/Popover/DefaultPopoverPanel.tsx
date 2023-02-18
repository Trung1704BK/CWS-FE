import { Popover } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

// eslint-disable-next-line react/display-name
const DefaultPopoverPanel = React.forwardRef(
  (
    {
      children,
      className,
      style,
      buttonRef,
      ...rest
    }: {
      children: React.ReactElement;
      className?: string;
      buttonRef?: React.RefObject<HTMLButtonElement>;
    } & React.HTMLAttributes<HTMLDivElement>,
    forwardedRef: any
  ) => {
    const defaultStyle = {
      top:
        (buttonRef?.current?.offsetTop || 0) +
        (buttonRef?.current?.offsetHeight || 0) +
        16,
      right: (buttonRef?.current?.offsetLeft || 0) + 16,
    };
    return (
      <Popover.Panel
        as="div"
        className={classNames(
          "absolute z-50 w-64 overflow-hidden rounded-xl border bg-white shadow md:w-80",
          className?.match(/left|right/) ? className : "right-2"
        )}
        ref={forwardedRef}
        style={{
          ...defaultStyle,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Popover.Panel>
    );
  }
);

export default DefaultPopoverPanel;
