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
  Input: {
    baseStyle: {
      color: "white",
      focusBorderColor: "accent.base",
    },
  },
  Divider: {
    baseStyle: {
      rounded: "full",
      opacity: 1,
    },
  },
  Link: {
    baseStyle: {
      color: "accent.base",
      _hover: {
        color: "accent.700",
      },
    },
  },
  ListItem: {
    baseStyle: {
      color: "white",
    },
  },
};

const styles = {
  global: {
    li: {
      color: "white",
    },
  },
};

export const theme = extendTheme({
  colors,
  components,
  styles,
});
