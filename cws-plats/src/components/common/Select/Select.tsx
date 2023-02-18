import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { memo, useMemo } from "react";

type AppInputProps = {
  showGreenBorder?: boolean;
};
type SelectProps = AppInputProps & ChakraSelectProps;

export const VALID_FIELD_GREEN_COLOR = "green.300";
export const getShowGreenBorder = ({
  isError,
  isTouched,
}: {
  isError: boolean;
  isTouched: boolean;
}): boolean => {
  if (isError && isTouched) return false;

  return true;
};

function Select({ showGreenBorder, children, ...rest }: SelectProps) {
  const additionProps = useMemo(
    () => ({
      borderColor: showGreenBorder ? VALID_FIELD_GREEN_COLOR : undefined,
      borderWidth: showGreenBorder ? "2px" : undefined,
    }),
    [showGreenBorder]
  );

  return (
    <ChakraSelect {...rest} {...additionProps}>
      {children}
    </ChakraSelect>
  );
}

export default memo(Select);
