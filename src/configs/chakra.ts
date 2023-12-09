import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { Tokens } from "../../.mirrorful/theme";

const colors = {
  ...Tokens.colors,
};

const components: { [key: string]: ComponentStyleConfig } = {
  Button: {
    defaultProps: {
      colorScheme: "accent",
    },
    variants: {
      solid: {
        color: "bg.base",
      },
    },
  },
};

/*
const styles = {
  global: {
    body: {
      background: "bg.base",
      color: "white",
    },
  },
};
*/

export const theme = extendTheme({
  colors,
  components,
  /*styles,*/
});
