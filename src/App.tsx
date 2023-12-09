import { theme } from "./configs/chakra";
import { RouterWrapper } from "./pages/RoutingWrapper";
import { ChakraProvider } from "@chakra-ui/react";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterWrapper />
    </ChakraProvider>
  );
}
