import {
  Box,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Icon,
  Flex,
  Toast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { Post } from "../../types/Post";

interface MobileHomeMainProps {
  posts: Post[];
}

export function DesktopHomeMain({ posts }: MobileHomeMainProps) {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  const multipliedPosts = Array(5).fill(posts).flat();

  const handleCopyLink = (postId: string) => {
    const linkToCopy = `${currentUrl}post/${postId}`;
    navigator.clipboard.writeText(linkToCopy);
    alert("Link copied to clipboard");

  };

  const Article = ({ post, index }: { post: { title: string; content: string }; index: number }) => {
    let articleStyleClass = '';

    const pattern = ['double', 'double', 'single', 'doublev2', 'doublev2', 'double', 'double', 'single', 'doublev2', 'doublev2'];

    articleStyleClass = pattern[index % pattern.length];

    if (articleStyleClass === 'double') {
      return (
        <Box
          width="37.5vw"
          backgroundColor="#1C1C20"
          borderRadius="20px"

        >
          <Box
            height="40vh"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              padding={2}
              borderRadius="20px"
              src={post.image?.src}
              alt={post.image.source}
              height="100%"
              width="100%"
              objectFit="cover"
            />
          </Box>
          <Box
            p={4}
          >
            <Heading
              as="h2"
              size="md"
              mb={2}
            >
              {post.title}
            </Heading>
            <Text
              fontSize="sm"
              color="#FFFFFF"
              mb={2}
            >
              {post.subtitle}
            </Text>
            <Box
              alignItems="center"
              justifyContent="space-between"

            >
              <Box
                _hover={{ cursor: "pointer" }}
                p={2}
                display="inline-flex"
                color="#FEC709"
                border={{ base: "1px solid #FEC709" }}
                borderRadius="10px"
                mb={2}
              >
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/post/${post.id}`}
                  color="#FEC709"
                >
                  Mehr lesen
                  <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
                </ChakraLink>
              </Box>
              <Flex
                alignItems="center"
                gap={2}
              >
                <Text
                  fontSize="sm"
                  color="gray.400"
                >
                  Author
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.400"
                >
                  Date
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.400"
                >
                  Time To read
                </Text>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Icon
                    as={CiShare2}
                    onClick={() => handleCopyLink(post.id)}
                    cursor="pointer"
                  />
                </Box>
                
              </Flex>
            </Box>
          </Box>
        </Box>
      )
    } else if (articleStyleClass === 'doublev2') {
      return (
        <Box width="80vw">
          doublev2
        </Box>
      )

    } else if (articleStyleClass === 'single') {
      return (
        <Box width="80vw">
          Single
        </Box>
      )

    }

    return (
      <Box className={`article ${articleStyleClass}`} p={4} mb={4}>
        <Heading as="h2" size="md" mb={2}>
          {post.title}
        </Heading>
        <Text>{articleStyleClass}</Text>
      </Box>
    );
  };

  return (
    <Flex
      flexWrap="wrap"
      marginLeft="10vw"
      mt="10vh"
      gap="5vw"
    >
      {multipliedPosts.map((post, index) => (
        <Article key={index} post={post} index={index} />
      ))}
    </Flex>
  );
}
