import React, { memo } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import useToggle from "../../../lib/common/hooks/useToggle";
import { BeatLoader } from "react-spinners";
import classNames from "classnames";
import Label from "../Label/Label";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import { errorClassNames, successClassNames } from "./Input.preset";
import { FormErrorMessage } from "@chakra-ui/react";

export type FieldProps = {
  showGreenBorder?: boolean;
  error?: string;
  label?: string;
  labelClassname?: string;
  outerClassNames?: string;
};

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
  clearable?: boolean;
  hiddenable?: boolean;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  isLoading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"input">, "onBlur"> &
  FieldProps;

function Input({
  value,
  placeholder,
  type,
  onChange,
  className,
  autoComplete,
  clearable = true,
  hiddenable = false,
  label,
  labelClassname,
  name,
  error,
  isLoading,
  outerClassNames,
  disabled,
  required = true,
  showGreenBorder = false,
  ...props
}: Props) {
  const { toggle: toggleHidden, value: hiddenValue } = useToggle(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClearClick = () => {
    if (onChange && name) {
      onChange({
        target: { value: "", name: name },
      } as React.ChangeEvent<HTMLInputElement>);

      inputRef.current?.focus();
    }
  };

  return (
    <LabelWrapper
      outerClassNames={outerClassNames}
      labelClassname={labelClassname}
      label={label}
      error={error}
      isRequired={required}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="relative inline-block w-full">
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={hiddenValue ? "text" : type}
          autoComplete={autoComplete}
          ref={inputRef}
          className={classNames(
            className,
            "peer w-full rounded border px-3 outline-none transition-[padding,box-shadow] focus:ring-2",
            "h-12",
            "text-sm",
            {
              "pt-5 pb-5": placeholder,
              "pt-3 pb-2": !placeholder,
              "cursor-not-allowed bg-gray-300": disabled,
            },
            (showGreenBorder && successClassNames) ||
              (error && !disabled && !showGreenBorder && errorClassNames)
          )}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          {...props}
        />

        {!disabled && (
          <span className="absolute right-4 top-4 flex cursor-pointer items-center gap-1">
            {clearable && onChange && !!value?.toString().length && (
              <span
                onClick={handleClearClick}
                className={classNames("cursor-pointer")}
                aria-label="Clear"
              >
                <IoCloseCircle className="h-5 w-5 text-gray-500" />
              </span>
            )}
            {hiddenable && (
              <span
                className={classNames("cursor-pointer", {
                  hidden: !value?.toString().length,
                })}
                onClick={toggleHidden}
                aria-label="Toggle password visibility"
              >
                {/* <IoEye width={24} height={24} className="text-gray-500" /> */}
                {hiddenValue ? (
                  <RxEyeOpen className="h-5 w-5 text-gray-500" />
                ) : (
                  <RxEyeClosed className="h-5 w-5 text-gray-500" />
                )}
              </span>
            )}
            {isLoading && (
              <span>
                <BeatLoader size="4px" />
              </span>
            )}
          </span>
        )}
      </div>
    </LabelWrapper>
  );
}

export const LabelWrapper = ({
  children,
  label,
  labelClassname,
  outerClassNames,
  isRequired,
  error,
  ...rest
}: {
  isRequired?: boolean;
} & React.ComponentPropsWithoutRef<"label"> &
  FieldProps) => {
  return (
    <div className={classNames("relative space-y-1", outerClassNames)}>
      {label && (
        <>
          <Label className={labelClassname} isRequired={isRequired} {...rest}>
            {label}
          </Label>
        </>
      )}
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </div>
  );
};

export default memo(Input);
