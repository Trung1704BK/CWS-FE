import React, { memo } from "react";
import classNames from "classnames";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { FieldProps, LabelWrapper } from "../Input/Input";
import { errorClassNames, successClassNames } from "../Input/Input.preset";
import { DateTimePickerProps } from "react-datetime-picker";

type Props = {
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
  label?: string;
  labelClassname?: string;
  outerClassNames?: string;
  required?: boolean;
} & DateTimePickerProps &
  FieldProps;

function AppDatePicker({
  value,
  onChange,
  className,
  label,
  labelClassname,
  name,
  error,
  disabled,
  showGreenBorder,
  required = true,
  ...props
}: Props) {
  const textareaRef = React.useRef<HTMLInputElement>(null);

  return (
    <LabelWrapper
      labelClassname={labelClassname}
      label={label}
      error={error}
      isRequired={required}
      onClick={() => textareaRef.current?.focus()}
    >
      <div className="relative inline-block w-full">
        <DateTimePicker
          inputRef={textareaRef}
          name={name}
          value={value}
          onChange={onChange}
          className={classNames(
            className,
            "peer w-full rounded border px-3 outline-none transition-[padding,box-shadow] focus:ring-2",
            "h-12",
            "text-sm",
            {
              "cursor-not-allowed bg-gray-300": disabled,
            },
            (showGreenBorder && successClassNames) ||
              (error && !disabled && !showGreenBorder && errorClassNames)
          )}
          disabled={disabled}
          {...props}
        />
      </div>
    </LabelWrapper>
  );
}

export default memo(AppDatePicker);
