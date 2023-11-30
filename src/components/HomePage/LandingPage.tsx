import { Box, Heading, Text, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { Post } from "../../types/Post";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link as ReactRouterLink } from "react-router-dom";

interface LandingPageProps {
  post: Post;
}

export function LandingPage({ post: latestPost }: LandingPageProps) {
  return (
    <Box
      position="relative"
      height="100vh"
      backgroundImage={
        latestPost ? `url(${latestPost.image?.src})` : "url(placeholder.jpg)"
      }
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white"
      >
        <Heading>Ukrain Russia War</Heading>
      </Box>

      <Box
        position="absolute"
        bottom="0"
        right="0"
        textAlign={{ base: "center", md: "left" }}
        paddingRight={{ base: "10vw", md: "70%" }}
        paddingLeft={{ base: "10vw", md: "3vw" }}
        color="white"
        paddingBottom={{ base: "2vh", md: "2vh" }}
      >
        <Heading
          fontSize={{ base: "1.3rem", md: "1.5rem" }}
          paddingBottom={{ base: "1vh", md: "1vh" }}
        >
          {latestPost ? latestPost.title : "Lorem ipsum dolor sit amet"}
        </Heading>
        <Text fontSize={{ base: "0.9rem", md: "1rem" }}>
          {latestPost
            ? latestPost.subtitle
            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima tempore ratione quas pariatur modi magnam voluptate dolorem, quo facere repudiandae incidunt earum autem dolore iste cum nam aliquid beatae. Velit."}
        </Text>
        {latestPost && (
          <ChakraLink
            as={ReactRouterLink}
            to={`/posts/${latestPost.id}`}
            display="flex"
            alignItems="center"
            color="teal.500"
            _hover={{ color: "teal.700" }}
          >
            Mehr lesen
            <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
          </ChakraLink>
        )}
      </Box>
    </Box>
  );
}
