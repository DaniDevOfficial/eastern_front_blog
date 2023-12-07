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

export function DesktopHomeMain({ posts }: MobileHomeMainProps) {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  const multipliedPosts = Array(5).fill(posts).flat();

  const handleCopyLink = (postId: string) => {
    const linkToCopy = `${currentUrl}post/${postId}`;
    navigator.clipboard.writeText(linkToCopy);
  };

  const Article = ({ post, index }: { post: { title: string; content: string }; index: number }) => {
    let articleStyleClass = '';

    const pattern = ['double', 'double', 'single', 'doublev2', 'doublev2', 'double', 'double', 'single', 'doublev2', 'doublev2'];

    articleStyleClass = pattern[index % pattern.length];

    if (articleStyleClass === 'double') {
      return (
        <div>
          double
        </div>
      )
    } else if (articleStyleClass === 'doublev2') {
      return (
        <div>
          doublev2
        </div>
      )

    } else if (articleStyleClass === 'single') {
      return (
        <div>
          single
         </div>
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
    <Box>
      {multipliedPosts.map((post, index) => (
        <Article key={index} post={post} index={index} />
      ))}
    </Box>
  );
}
