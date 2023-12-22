import {
  Box,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Icon,
  Flex,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import { Post } from "../../types/Post";
import { Utils } from "../../dateUtils";
interface SingleArticleContainerProps {
  post: Post;
  type: "double" | "single" | "smallImageLeft" | "smallImageRight";
}
export function SingleArticleContainer({
  post,
  type,
}: SingleArticleContainerProps) {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;

  const handleCopyLink = (postId: string) => {
    const linkToCopy = `${currentUrl}post/${postId}`;
    navigator.clipboard.writeText(linkToCopy);
    alert("Link copied to clipboard"); // change to toast
  };
  function handleBookmark(postId: string) {
    alert("Bookmark clicked: " + postId); // change to real handler
  }
  const TextPart = () => {
    return (
      <>
        <Flex align={"start"}>
          <VStack paddingX={4} width={"100%"}>
            <Flex
              align={"top"}
              direction={"row"}
              justify={"space-between"}
              width={"100%"}
              height={"100%"}
            >
              <Heading size={"sm"}>{post.title}</Heading>
              <Icon
                color={"white"}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleBookmark(post.id)}
                as={CiBookmark}
                ml={2}
                boxSize={5}
              />
            </Flex>
            <Text textAlign={"start"} width={"100%"}>
              {post.subtitle}
            </Text>
          </VStack>
        </Flex>
      </>
    );
  };
  const BottomPart = () => {
    return (
      <Box alignItems="center" justifyContent="space-between" p={4}>
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
        <Flex alignItems="center" gap={2}>
          <Text fontSize="sm" color="gray.400">
            {post.author}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {!!post.published_at && Utils.formatMessageDate(post.published_at)}
          </Text>
          <Text fontSize="sm" color="gray.400"></Text>
          <Box display="flex" alignItems="center" gap={2}>
            <Icon
              as={CiShare2}
              onClick={() => handleCopyLink(post.id)}
              cursor="pointer"
            />
          </Box>
        </Flex>
      </Box>
    );
  };

  if (type === "double") {
    return (
      <Box
        width="37.5vw"
        backgroundColor="#1C1C20"
        borderRadius="20px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="40vh"
        mb={10}
      >
        <Box>
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
              alt={post.image?.source ?? ""}
              height="100%"
              width="100%"
              objectFit="cover"
            />
          </Box>
        </Box>
        <Flex height={"100%"} direction={"column"}>
          <TextPart />
          <Spacer />
          <BottomPart />
        </Flex>
      </Box>
    );
  } else if (type === "single") {
    return (
      <Box width="80vw" backgroundColor="#1C1C20" borderRadius="20px" mb={10}>
        <Box
          height="50vh"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            padding={2}
            borderRadius="20px"
            src={post.image?.src}
            alt={post.image?.source}
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </Box>
        <Box>
          <TextPart />
          <BottomPart />
        </Box>
      </Box>
    );
  } else if (type === "smallImageLeft") {
    return (
      <Box width="80vw" backgroundColor="#1C1C20" borderRadius="20px" mb={10}>
        <Flex alignItems="center" height={"100%"}>
          <Box
            width={"40%"}
            ml={4}
            display={"flex"}
            flexDirection="column"
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              borderRadius="20px"
              src={post.image?.src}
              alt={post.image?.source}
              height="100%"
              width="100%"
              objectFit="cover"
              p={2}
            />
          </Box>
          <Flex
            height={"100%"}
            width={"100%"}
            align={"stretch"}
            direction={"column"}
          >
            <TextPart />
            <Spacer />
            <BottomPart />
          </Flex>
        </Flex>
      </Box>
    );
  } else if (type === "smallImageRight") {
    return (
      <Box width="80vw" backgroundColor="#1C1C20" borderRadius="20px" mb={10}>
        <Flex alignItems="center" height={"100%"}>
          <Flex
            width={"100%"}
            height={"100%"}
            align={"stretch"}
            direction={"column"}
          >
            <TextPart />
            <Spacer />
            <BottomPart />
          </Flex>
          <Box
            width={"40%"}
            ml={4}
            display={"flex"}
            flexDirection="column"
            justifyContent={"center"}
            height={"100%"}
          >
            <Image
              borderRadius="20px"
              src={post.image?.src}
              alt={post.image?.source}
              height="100%"
              width="100%"
              objectFit="cover"
              p={2}
            />
          </Box>
        </Flex>
      </Box>
    );
  }

  return <>Opsie</>;
}
