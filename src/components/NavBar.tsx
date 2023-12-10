import { CloseIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  IconButton,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Timeline", path: "/timeline" },
  { name: "About", path: "/about" },
];

export function NavBar() {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  return (
    <chakra.div marginBottom={{ base: 2, md: 5 }}>
      <Flex
        justify={"space-between"}
        align={"center"}
        paddingX={{ base: 2, md: 5 }}
        paddingY={3}
      >
        {/* Mobile Nav Button */}
        <IconButton
          aria-label="s"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          fontSize={isOpen ? "xl" : "2xl"}
          variant={"ghost"}
          color={"white"}
          display={{ base: "inherit", md: "none" }}
          _active={{ bg: "transparent", transform: "scale(1.2)" }}
        />
        {/* Logo */}
        <HStack>
          <Heading
            as={Link}
            to={"/"}
            fontSize={{ base: "xs", md: "lg", lg: "2xl" }}
            fontWeight={"bold"}
            _hover={{ transform: "scale(1.05)" }}
          >
            Western Front Blog
          </Heading>
        </HStack>
        {/* Tablet & Laptop Nav Links */}
        <HStack gap={10} display={{ base: "none", md: "inherit" }}>
          {pages.map((page) => (
            <Heading
              as={Link}
              to={page.path}
              fontSize={{ md: "lg", lg: "xl" }}
              fontWeight={"medium"}
              _hover={{ transform: "scale(1.1)" }}
            >
              {page.name}
            </Heading>
          ))}
        </HStack>
        {/* Actions */}
        <ButtonGroup>
          <IconButton
            aria-label="Suche"
            icon={<Search2Icon />}
            variant={"ghost"}
            color={"white"}
            _hover={{ bg: "transparent", transform: "scale(1.2)" }}
            onClick={() => alert("TODO: Implement Search")}
          />
          <Button
            onClick={() => alert("TODO: Implement Login")}
            _hover={{ transform: "scale(1.05)" }}
          >
            Login
          </Button>
        </ButtonGroup>
      </Flex>
      {/* Mobile Nav Links */}
      <Flex display={{ base: isOpen ? "inherit" : "none", md: "none" }}>
        <VStack>
          {pages.map((page) => (
            <Heading
              as={Link}
              to={page.path}
              onClick={onClose}
              fontSize={"lg"}
              fontWeight={"medium"}
              _hover={{ transform: "scale(1.1)" }}
            >
              {page.name}
            </Heading>
          ))}
        </VStack>
      </Flex>
    </chakra.div>
  );
}
