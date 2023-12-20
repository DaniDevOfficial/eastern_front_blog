import {
  CloseIcon,
  HamburgerIcon,
  Search2Icon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  ButtonGroup,
  ButtonProps,
  Flex,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  chakra,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { User, getAuth, signInWithPopup } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleProvider } from "../configs/firebase";
import { isAdmin as checkIfAdmin } from "../repo/repo";

const pages = [
  { name: "Timeline", path: "/timeline" },
  { name: "About", path: "/about" },
];

const song = new Audio(
  atob(
    "aHR0cHM6Ly93d3cucnVzc2lhbi10cmFuc2xhdGlvbi1wcm9zLmNvbS9hdWRpby9ydXNzaWFuLWZlZGVyYXRpb24tbmF0aW9uYWwtYW50aGVtLm1wMw"
  )
);

export function NavBar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
  const [clicked, setClicked] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    if (clicked >= 20) {
      song.play();
      setClicked(0);
    }
  }, [clicked]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);

      if (u) {
        checkIfAdmin(u.uid).then(setIsAdmin);
      }
    });

    return unsubscribe;
  }, []);

  function handleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast({
          title: "Login erfolgreich",
          description: `Willkommen zurück, ${result.user.displayName}!`,
          status: "success",
        });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") return;
        toast({
          title: "Login fehlgeschlagen",
          description: error.code,
          status: "error",
        });
      });
  }

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
            onClick={() => setClicked((c) => c + 1)}
          >
            Western Front Blog
          </Heading>
        </HStack>
        {/* Tablet & Laptop Nav Links */}
        <HStack gap={10} display={{ base: "none", md: "inherit" }}>
          {pages.map((page) => (
            <Heading
              key={page.path}
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
          {user ? (
            <Menu>
              {({ onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    variant={"ghost"}
                    _hover={{ bg: "transparent", transform: "scale(1.1)" }}
                    _active={{ bg: "transparent", transform: "scale(1.1)" }}
                  >
                    <Avatar
                      size={"sm"}
                      name={user!.displayName ?? undefined}
                      src={user!.photoURL ?? undefined}
                    />
                  </MenuButton>
                  <MenuList bg="gray.100" paddingX={2} paddingY={2}>
                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      width={"100%"}
                    >
                      <Text color={"black"} fontWeight={"medium"}>
                        {user!.displayName ?? user!.email ?? ""}
                      </Text>
                      <IconButton
                        onClick={onClose}
                        variant={"ghost"}
                        color={"black"}
                        _hover={{ bg: "transparent", transform: "scale(1.5)" }}
                        aria-label="Schließen"
                        icon={<SmallCloseIcon />}
                      />
                    </Flex>
                    {isAdmin && (
                      <AvatarMenuIcon onClick={() => navigate("/admin")}>
                        Admin
                      </AvatarMenuIcon>
                    )}
                    <AvatarMenuIcon
                      onClick={() => navigate("/profile")}
                      marginBottom={2}
                    >
                      Profil
                    </AvatarMenuIcon>
                    <AvatarMenuIcon onClick={() => auth.signOut()}>
                      Logout
                    </AvatarMenuIcon>
                  </MenuList>
                </>
              )}
            </Menu>
          ) : (
            <Button onClick={handleLogin} _hover={{ transform: "scale(1.05)" }}>
              Login
            </Button>
          )}
        </ButtonGroup>
      </Flex>
      {/* Mobile Nav Links */}
      <Flex display={{ base: isOpen ? "inherit" : "none", md: "none" }}>
        <VStack>
          {pages.map((page) => (
            <Heading
              key={page.path}
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

function AvatarMenuIcon({
  onClick,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <MenuItem
      paddingY={3}
      marginBottom={1}
      _first={{ roundedTop: "md" }}
      _last={{ roundedBottom: "md" }}
      _hover={{ bg: "gray.200" }}
      onFocus={(e) => e.target.blur()}
      {...rest}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  );
}
