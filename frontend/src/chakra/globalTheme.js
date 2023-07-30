import { extendTheme } from "@chakra-ui/react";
export const globalTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "gray.50",
      },
    },
  },
});
