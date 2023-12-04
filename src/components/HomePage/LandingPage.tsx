
import { Box, Heading, Text, Link as ChakraLink, Icon, Center } from "@chakra-ui/react";
import { Post } from "../../types/Post";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";

interface LandingPageProps {
  post: Post;
}

export function LandingPage({ post: latestPost }: LandingPageProps) {
  return (
    <Box>
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
            bottom="0"
            right="0"
            textAlign={{ base: "center", md: "left" }}
            paddingRight={{ base: "10vw", md: "70%" }}
            paddingLeft={{ base: "10vw", md: "3vw" }}

            color="white"
            paddingBottom={{ base: "5%", md: "10%" }}
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
                position="absolute"
                alignItems="center"
                color="#FEC709"
                border={{ base: "1px solid #FEC709" }}
                borderRadius="10px"

              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/post/${latestPost.id}`}
                  display="flex"
                  alignItems="center"
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
        color="#FEC709"


      >



        <Icon
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}

        as={AiOutlineArrowDown} boxSize={6} />
      </Box>
    </Box>
  );
}
