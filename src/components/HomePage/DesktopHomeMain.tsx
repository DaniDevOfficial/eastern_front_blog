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
import { SingleArticleContainer } from "./SingleArticleContainer";

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
    alert("Link copied to clipboard"); // change to toast

  };

  const Article = ({ post, index }: { post: Post; index: number }) => {
    let articleStyleClass = '';

    const pattern = ['double', 'double', 'single', 'smallImageLeft', 'smallImageRight', 'double', 'double', 'single', 'smallImageLeft', 'smallImageRight'];

    articleStyleClass = pattern[index % pattern.length];


      return (
        <SingleArticleContainer post={post} type={articleStyleClass as "double" | "single" | "smallImageLeft" | "smallImageRight"} />
      )




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
