import { Flex, chakra } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export function PageLayout() {
  return (
    <Flex justify={"center"} width={"100%"} bg="black" minHeight="100vh" flexDirection="column">
      <chakra.div
        width={{ base: "100%", md: "100%", lg: "100%" }}
        height={"100%"}
        bg="bg.base"
        flex="1"
        display="flex"
        flexDirection="column"
        pb={10}
      >
        <NavBar />
        <Outlet />
      </chakra.div>
      <Footer />

    </Flex>
  );
}
