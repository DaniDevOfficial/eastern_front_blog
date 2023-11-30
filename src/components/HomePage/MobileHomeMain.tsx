import {
  Box,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { Post } from "../../types/Post";

interface MobileHomeMainProps {
    posts: Post[];
    }

export function MobileHomeMain({ posts }: MobileHomeMainProps) {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;

  const handleCopyLink = (postId: string) => {
    const linkToCopy = `${currentUrl}posts/${postId}`;
    navigator.clipboard.writeText(linkToCopy);
  };

  return (
    <Box
      position="relative"
      background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))"
    >
      {posts.map((post) => (
        <Box key={post.id} width="100%" minHeight="0vh" padding="50px 0">
          <Heading textAlign="center">{post.title}</Heading>

              <Text textAlign="center">
                  {/* TOOD: Add Author to Model */}
            Author: {/*post.author*/} | Posted on:{" "}
            {post.published_at && post.published_at.toISOString()}
          </Text>

          <Box display="flex" justifyContent="center" mt="4">
            {post.image && (
              <Image
                src={post.image?.src}
                alt={post.image.source}
                maxW="100%"
                maxH="100%"
              />
            )}
          </Box>

          <Box
            mt="4"
            bg="gray.700"
            p="2"
            borderRadius="md"
            textAlign="center"
            margin="1vw "
          >
            Likes: (für später)
            <Icon
              as={CiShare2}
              onClick={() => handleCopyLink(post.id)}
              cursor="pointer"
              marginLeft="10px"
            />
          </Box>

          <Text textAlign="center" mt="4">
            {post.subtitle}
          </Text>

          <ChakraLink
            as={ReactRouterLink}
            to={`/posts/${post.id}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="teal.500"
            _hover={{ color: "teal.700" }}
            mt={4}
          >
            Mehr lesen
            <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
          </ChakraLink>
        </Box>
      ))}
    </Box>
  );
}
