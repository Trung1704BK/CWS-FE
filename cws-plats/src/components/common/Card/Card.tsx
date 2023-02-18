import { Heading } from "@chakra-ui/react";
import classNames from "classnames";
import React from "react";
type Props = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

function Card({ children, className, ...props }: Props) {
  return (
    <div
      className={classNames("space-y-2 border bg-white", className, {
        "rounded-xl": !className?.includes("rounded"),
        "p-4 md:p-5": !className?.includes("p-"),
      })}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Heading = function CardHeading({ children, ...props }: Props) {
  return (
    <Heading size="md" {...props}>
      {children}
    </Heading>
  );
};

Card.Divider = function CardDivider({ children, ...props }: Props) {
  return (
    <div className="border-t border-gray-200 pb-1" {...props}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, ...props }: Props) {
  return (
    <div className="space-y-3" {...props}>
      {children}
    </div>
  );
};

export default Card;
