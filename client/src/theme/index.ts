import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    light: {
      background: "#FFFFFF",
      text: "#333333",
    },
    dark: {
      background: "#1A202C",
      text: "#FFFFFF",
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
        bg: "light.background",
        color: "light.text",
      },
    },
  },
});

export default theme;
