
import { Box, Heading, Text, Link as ChakraLink, Icon, Center } from "@chakra-ui/react";
import { Post } from "../../types/Post";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";
import { CiBookmark, CiClock1 } from "react-icons/ci";

interface LandingPageProps {
  post: Post;
}

export function LandingPage({ post: latestPost }: LandingPageProps) {
  return (
    <Box
    overflowX={{ base: "hidden", md: "hidden" }}
    >
      <Center>

        <Box
          position="relative"
          marginTop="10vh"
          height="80vh"
          backgroundImage={
            latestPost ? `url(${latestPost.image?.src})` : "url(placeholder.jpg)"
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
            paddingLeft="5%"
            color="white"
            display="flex"
            alignItems="center"
          >
            <Text fontSize="1rem" padding="0 10px">
              Author
            </Text>
            <Text fontSize="1rem" padding="0 10px">
              Date
            </Text>
            <Box display="flex" alignItems="center" padding="0 10px">
              <Icon as={CiClock1} boxSize={5} />
              <Text fontSize="1rem" padding="0 5px">
                5 min
              </Text>
            </Box>
            <Icon as={CiBookmark} boxSize={6} />
          </Box>
          <Box
            position="absolute"
            bottom="0"
            right="0"
            textAlign={{ base: "center", md: "left" }}
            paddingRight={{ base: "10vw", md: "70%" }}
            paddingLeft={{ base: "10vw", md: "3vw" }}

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
              <Box
                _hover={{ cursor: "pointer" }}
                p={2}
                display="inline-flex"
                color="#FEC709"
                border={{ base: "1px solid #FEC709" }}
                borderRadius="10px"

              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/post/${latestPost.id}`}
                  color="#FEC709"
                >
                  Mehr lesen
                  <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
                </ChakraLink>
              </Box>
            )}
          </Box>
        </Box>

      </Center>

      <Box
        position="relative"
        left="50%"
        marginTop="5vh"
        _hover={{ cursor: "pointer", color: "#" }}

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

          as={AiOutlineArrowDown} boxSize={6} />
      </Box>
    </Box>
  );
}
