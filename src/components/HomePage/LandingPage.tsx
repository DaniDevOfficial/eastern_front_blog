import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Icon,
  Center,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Post } from "../../types/Post";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";
import { CiBookmark, CiClock1 } from "react-icons/ci";
import { Utils } from "../../dateUtils";

interface LandingPageProps {
  post: Post;
}

export function LandingPage({ post: latestPost }: LandingPageProps) {
  return (
    <Box overflowX="hidden">
      <Center>
        <Box
          position="relative"
          marginTop="10vh"
          height="80vh"
          backgroundImage={
            latestPost
              ? `url(${latestPost.image?.src})`
              : "url(placeholder.jpg)"
          }
          backgroundSize="cover"
          backgroundPosition="center"
          width="80%"
          borderRadius="10px"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(0, 0, 0, 0.4)"
            borderRadius="10px"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            textAlign="left"
            paddingTop="2%"
            color="white"
            display="flex"
            alignItems="center"
          >
            <HStack paddingLeft={{ base: "5%", md: "10%", lg: "10%" }}>
              <Text fontSize="1rem">{latestPost?.author ?? ""}</Text>
              <Text fontSize="1rem">
                {!!latestPost?.published_at &&
                  Utils.formatMessageDate(latestPost.published_at)}
              </Text>
              <Icon as={CiBookmark} boxSize={6} />
            </HStack>
          </Box>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            textAlign={{ base: "center", md: "left" }}
            paddingLeft={{ base: "5%", md: "3%" }}
            color="white"
            paddingBottom={{ base: "5%", md: "5%" }}
          >
            <Heading
              fontSize={{ base: "1.3rem", md: "1.5rem" }}
              paddingBottom={{ base: "1vh", md: "1vh" }}
            >
              {latestPost ? latestPost.title : "Lorem ipsum dolor sit amet"}
            </Heading>

            {latestPost && (
              <>
                <Button variant="outline" marginLeft={{ base: "-5", md: 0 }}>
                  <HStack align={"center"}>
                    <ChakraLink
                      as={ReactRouterLink}
                      to={`/post/${latestPost.id}`}
                      color="#FEC709"
                    >
                      Mehr lesen
                    </ChakraLink>
                    <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
                  </HStack>
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Center>

      <Flex
        marginTop="5vh"
        _hover={{ cursor: "pointer", color: "#" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Icon
          color="#FEC709"
          _hover={{
            cursor: "pointer",
            color: "#FEC709",
            transform: "scale(1.2)",
            transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
          as={AiOutlineArrowDown}
          boxSize={6}
        />
      </Flex>

      <Box
        className="hr-lines"
        maxW="500px"
        mx="auto"
        my="40px"
        textAlign="center"
        position="relative"
      >
        <Box
          as="span"
          pos="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          h="2px"
          w={{ md: "130px", base: "100px" }}
          bg="#FEC709"
          display="block"
          content=""
        />
        <Box
          as="span"
          pos="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          h="2px"
          w={{ md: "130px", base: "100px" }}
          bg="#FEC709"
          display="block"
          content=""
        />
        <Text>Ältere Artikel</Text>
      </Box>
    </Box>
  );
}
