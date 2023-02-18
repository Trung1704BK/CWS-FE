import classNames from "classnames";
import React from "react";

type Props = {
  error?: string;
};

function ErrorLabel({ error }: Props) {
  return error ? (
    <div
      className={classNames("mt-1 text-xs text-red-500 transition", {
        "text-[0px]": !error,
        "ml-3": error,
      })}
    >
      {error}
    </div>
  ) : null;
}

export default ErrorLabel;
