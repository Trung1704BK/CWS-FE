/* eslint-disable @next/next/no-img-element */
import { FormErrorMessage } from "@chakra-ui/react";
import classNames from "classnames";
import Image from "next/image";
import { memo } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { RxCross1, RxUpload } from "react-icons/rx";
import { FieldProps, LabelWrapper } from "../Input/Input";

// make type that the seconds is overridable

type DropzoneType = {
  // eslint-disable-next-line no-unused-vars
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
  multiple?: boolean;
  outerClassNames?: string;
  labelClassname?: string;
  value: ImageType[];
  onDelete?: (index: number) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> &
  FieldProps;

type ImageType = string | ArrayBuffer | null | File;

export default memo(function AppDropzone({
  onDrop,
  className,
  multiple,
  label,
  error,
  outerClassNames,
  labelClassname,
  onDelete,
  value,
  ...rest
}: DropzoneType) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      image: ["image/jpeg", "image/png", "image/jpg"],
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image");
    },
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    multiple: multiple || false,
  });

  value = value.filter((image) => {
    if (image instanceof File) {
      if (image.size === 0) return false;
    }

    return true;
  });

  const renderDropTheFile = () => {
    return (
      <div className="flex flex-col items-center gap-2 text-center text-xs">
        <RxUpload />
        <p>Drop the files here</p>
      </div>
    );
  };

  return (
    <LabelWrapper
      error={error}
      isRequired
      label={label}
      labelClassname={labelClassname}
      outerClassNames={outerClassNames}
    >
      <div className={classNames(outerClassNames, "flex flex-wrap gap-2")}>
        {value?.map((image, index) => {
          const isUrl = typeof image === "string";
          const imgSrc = isUrl ? image : URL.createObjectURL(image as File);

          return (
            <div className="relative" key={index}>
              {onDelete && (
                <div
                  className="absolute right-1 top-1 z-20 rounded-md p-2 hover:bg-gray-200"
                  onClick={(e) => {
                    onDelete(index);
                    e.preventDefault();
                  }}
                >
                  <RxCross1 className="" />
                </div>
              )}
              <div
                {...getRootProps()}
                className={classNames(
                  "rounded-xl border border-dashed border-sky-300 bg-sky-100 p-2",
                  "flex items-center justify-center",
                  "cursor-pointer text-sm",
                  "relative ",
                  className?.includes("w-") ? "" : "aspect-square h-32",
                  className
                )}
                {...rest}
              >
                <>
                  <input {...getInputProps()} />

                  {isDragActive ? (
                    renderDropTheFile()
                  ) : (
                    <Image
                      src={imgSrc}
                      alt="image"
                      className="aspect-square h-28 rounded-xl object-cover p-1"
                      fill
                    />
                  )}
                </>
              </div>
            </div>
          );
        })}

        {(multiple || value?.length == 0) && (
          <div
            {...getRootProps()}
            className={classNames(
              "rounded-xl border border-dashed border-sky-300 bg-sky-100 p-2",
              "flex items-center justify-center",
              "cursor-pointer text-sm",
              "relative",
              className?.includes("w-") ? "" : "aspect-square h-32",
              className
            )}
            {...rest}
          >
            {renderDropTheFile()}
            <input {...getInputProps()} />
          </div>
        )}
      </div>
    </LabelWrapper>
  );
});
