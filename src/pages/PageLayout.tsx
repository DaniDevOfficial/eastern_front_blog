import { Flex, chakra } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export function PageLayout() {
  return (
    <Flex justify={"center"} width={"100%"} bg="black">
      <chakra.div
        width={{ base: "100%", md: "100%", lg: "80%" }}
        height={"100%"}
        bg="bg.base"
      >
        <NavBar />
        <Outlet />
        <Footer />
      </chakra.div>
    </Flex>
  );
}
