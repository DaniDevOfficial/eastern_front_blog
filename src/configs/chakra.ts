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
  Text: {
    baseStyle: {
      color: "white",
      // TOOD: add font family
    },
  },
  Heading: {
    baseStyle: {
      color: "white",
      // TOOD: add font family
    },
  },
  Divider: {
    baseStyle: {
      rounded: "full",
      opacity: 1,
    },
  },
};

export const theme = extendTheme({
  colors,
  components,
});
