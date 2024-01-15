import { StyleFunctionProps } from "@chakra-ui/react";

export const globalStyles = {
  global: ({ colorMode }: StyleFunctionProps) => ({
    body: {
      bg: colorMode === "light" ? "light.background" : "dark.background",
    },
  }),
};
