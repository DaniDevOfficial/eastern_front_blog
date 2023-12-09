import { Flex, chakra } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function PageLayout() {
  return (
    <Flex justify={"center"} width={"100%"} bg="black">
      <chakra.div
        width={{ base: "100%", md: "80%", lg: "65%" }}
        height={"100%"}
        bg="bg.base"
      >
        {/*TODO: Add Navbar*/}
        <Outlet />
        {/*TODO: Add Footer*/}
      </chakra.div>
    </Flex>
  );
}
