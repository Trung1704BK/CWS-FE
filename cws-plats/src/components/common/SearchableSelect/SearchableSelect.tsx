import { Select } from "chakra-react-select";
import classNames from "classnames";
import React from "react";
import { FieldProps, LabelWrapper } from "../Input/Input";
import { errorClassNames, successClassNames } from "../Input/Input.preset";

type Props = React.ComponentProps<typeof Select> & FieldProps;

function SearchableSelect({
  error,
  label,
  labelClassname,
  showGreenBorder,
  ...rest
}: Props) {
  const selectRef = React.useRef<any>(null);

  return (
    <>
      <LabelWrapper
        labelClassname={classNames(labelClassname)}
        label={label}
        error={error}
        isRequired={rest.required}
        onClick={() => selectRef.current?.focus()}
      >
        <Select
          ref={selectRef}
          classNamePrefix="select"
          defaultValue={rest.options && rest.options[0]}
          unstyled
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "3rem",
            }),
          }}
          components={{
            Option: (props) => {
              return (
                <div
                  className={classNames(
                    "bg-white p-3 hover:bg-gray-100",
                    props.isSelected && "bg-gray-100",
                    "flex items-center gap-1"
                  )}
                  {...props.innerProps}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {props?.data?.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      // eslint-disable-next-line @next/next/no-img-element, @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      src={props.data?.imageUrl}
                      alt={props.label}
                      className="mr-2 h-6 w-6 rounded-full"
                      onError={(e) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        e.target.src = "/assets/placeholder.png";
                      }}
                    />
                  )}
                  {props.children}
                </div>
              );
            },
          }}
          classNames={{
            control: () => {
              return classNames(
                "w-full rounded border outline-none transition-[padding,box-shadow] focus:ring-2 py-2 text-sm",
                "px-3",
                "min-h-[3rem]",
                (showGreenBorder && successClassNames) ||
                  (error &&
                    !rest.isDisabled &&
                    !showGreenBorder &&
                    errorClassNames)
              );
            },
            option: (props) => {
              return classNames(
                "bg-white hover:bg-gray-100 p-3",
                props.isSelected && "bg-gray-100"
              );
            },
            menuList: () => {
              return classNames("bg-white rounded shadow-lg");
            },
            multiValueLabel: () => {
              return classNames("px-2 py-1");
            },
            multiValue: () => {
              return classNames(
                "bg-gray-100 text-gray-700 rounded px-2 py-0.5 hover:bg-gray-200"
              );
            },
            valueContainer: () => {
              return classNames("flex flex-wrap gap-1");
            },
          }}
          {...rest}
        />
      </LabelWrapper>
    </>
  );
}

export default SearchableSelect;
