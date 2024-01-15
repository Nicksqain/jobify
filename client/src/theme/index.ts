import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { darkColors, lightColors } from "./colors";
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  styles: globalStyles,
  components: {
    Text: {
      baseStyle: ({ colorMode }: StyleFunctionProps) => ({
        bg: colorMode === "dark" ? "green.300" : "green.500",
        color: colorMode === "dark" ? "gray.800" : "white",
      }),
    },
  },
});

export default theme;
