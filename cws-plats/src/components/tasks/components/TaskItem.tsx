import { Card } from "@/components/common";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { RxArrowDown, RxCross1 } from "react-icons/rx";

export const TaskItem = ({
  taskName,
  index,
  children,
  onDelete,
}: {
  taskName: string;
  index: number;
  children: React.ReactNode;
  onDelete?: () => void;
}) => {
  return (
    <Disclosure key={index} defaultOpen>
      {({ open }) => (
        <Card className="overflow-hidden border-none p-0">
          <div>
            <Disclosure.Button
              className={classNames(
                "flex w-full items-center justify-between border p-3 text-gray-700",
                open ? "rounded-t-xl" : "rounded-xl"
              )}
            >
              <Card.Heading>{taskName}</Card.Heading>

              <div className="flex space-x-1 text-lg">
                <RxArrowDown
                  className={classNames(
                    open ? "rotate-180" : "",
                    "transition hover:scale-150"
                  )}
                />
                {onDelete && (
                  <RxCross1
                    className="transform text-red-500 transition hover:scale-150"
                    onClick={onDelete}
                  />
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="animate-opacity-1 overflow-auto rounded-b-xl border border-t-0 p-3 pt-0 text-gray-500">
              <div className="h-2"></div>
              <Card.Body>{children}</Card.Body>
            </Disclosure.Panel>
          </div>
        </Card>
      )}
    </Disclosure>
  );
};
