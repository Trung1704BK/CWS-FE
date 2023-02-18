import { buttonTheme } from "./theme/button";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
});
