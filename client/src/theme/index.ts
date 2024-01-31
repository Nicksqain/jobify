import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { darkColors, lightColors } from "./colors";
import { cardTheme } from "./components/card";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  styles: globalStyles,
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  components: {
    Card: cardTheme,
  },
});

export default theme;
