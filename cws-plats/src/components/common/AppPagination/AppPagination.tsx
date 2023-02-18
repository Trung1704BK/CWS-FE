import classNames from "classnames";
import Pagination, { PaginationProps } from "rc-pagination";

import React from "react";

type Props = PaginationProps & {
  hideLeftTotal?: boolean;
};

function AppPagination({
  current,
  className,
  hideLeftTotal = false,
  ...rest
}: Props) {
  return (
    <Pagination
      itemRender={(currentPage, type) => {
        if (type === "prev") {
          return (
            <button
              className={classNames(
                "focus:shadow-outline h-10 rounded-l-lg border border-r-0 border-gray-600 bg-white px-5 text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-black",
                {
                  "cursor-not-allowed opacity-50": currentPage === 0,
                }
              )}
            >
              Prev
            </button>
          );
        }
        if (type === "next") {
          return (
            <button
              className={classNames(
                "focus:shadow-outline h-10 rounded-r-lg border border-gray-600 bg-white px-5 text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-black",
                {
                  "cursor-not-allowed opacity-50": currentPage === current,
                }
              )}
            >
              Next
            </button>
          );
        }
        return (
          <button
            className={classNames(
              "focus:shadow-outline h-10 border border-r-0 border-gray-600 bg-white px-5 transition-colors duration-150 hover:bg-gray-100 hover:text-black",
              current === currentPage
                ? "bg-gray-500 text-white"
                : "text-gray-600"
            )}
          >
            {currentPage}
          </button>
        );
      }}
      showTotal={(total, range) => {
        if (hideLeftTotal) return null;
        return (
          <div className="mr-3 text-gray-500">{`${range[0]}-${range[1]} of ${total} items`}</div>
        );
      }}
      {...rest}
      current={current}
      className={classNames(
        "flex items-center justify-center border border-t-0 bg-white px-4 py-2 text-center text-sm",
        className
      )}
    />
  );
}

export default AppPagination;
