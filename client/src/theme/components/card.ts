import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({});

const sizes = {
  md: definePartsStyle({
    container: {},
  }),
};

const variants = {
  elevated: definePartsStyle((props) => ({
    container: {
      backgroundColor: mode("white", "#242429")(props),
    },
  })),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes, variants });
