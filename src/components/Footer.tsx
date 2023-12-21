import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Timeline", path: "/timeline" },
  { name: "Impressum", path: "/impressum" },
  { name: "Datenschutz", path: "/datenschutz" },
];

export function Footer() {
  return (
    <VStack
      gap={4}
      width={"100%"}
      paddingX={{ base: 2, md: 5 }}
      paddingTop={{ base: 2, md: 3, lg: 5 }}
      paddingBottom={{ base: 4, md: 6, lg: 12 }}
      bg="bg-highlight.base"
    >
      {/* Pages */}
      <Flex
        width={"100%"}
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "inherit" }}
      >
        {pages.map((page) => (
          <Text
            key={page.path}
            as={Link}
            to={page.path}
            _hover={{ transform: "scale(1.05)" }}
          >
            {page.name}
          </Text>
        ))}
      </Flex>
      <Divider />
      <Flex
        width={"100%"}
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "inherit" }}
        justify={{ base: "center", md: "space-between" }}
      >
        <Heading
          as={Link}
          to={"/"}
          fontSize={{ base: "lg", md: "lg", lg: "2xl" }}
          fontWeight={"bold"}
          _hover={{ transform: "scale(1.05)" }}
        >
          Western Front Blog
        </Heading>
        <Text textAlign={"center"}>
          © 2023 Western Front Blog. All rights reserved.
        </Text>
      </Flex>
    </VStack>
  );
}
