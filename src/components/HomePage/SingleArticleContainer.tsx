import {
    Box,
    Heading,
    Text,
    Image,
    Link as ChakraLink,
    Icon,
    Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import { Post } from "../../types/Post";
import React from "react";
interface SingleArticleContainerProps {
    post: Post;
    type: 'double' | 'single' | 'smallImageLeft' | 'smallImageRight';
}
export function SingleArticleContainer({ post, type }: SingleArticleContainerProps) {

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
            <Box
                p={4}
            >
                <Flex>
                    <Heading
                        as="h2"
                        size="md"
                        mb={2}
                    >
                        {post.title}
                    </Heading>
                    <Icon
                        _hover={{ cursor: "pointer" }}
                        onClick={() => handleBookmark(post.id)}
                        as={CiBookmark}
                        ml={2}
                        boxSize={5}
                    />
                </Flex>
                <Text
                    fontSize="sm"
                    color="#FFFFFF"
                    mb={2}
                >
                    {post.subtitle}
                </Text>

            </Box>
        )
    }
    const BottomPart = () => {
        return (
            <Box
                alignItems="center"
                justifyContent="space-between"
                p={4}

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
        )
    }


    if (type === 'double') {
        return (
            <Box
                width="37.5vw"
                backgroundColor="#1C1C20"
                borderRadius="20px"
                display="flex"
                flexDirection="column" // Set flexDirection to column
                justifyContent="space-between" // Align items with space between them
                minHeight="40vh" // Set a minimum height for the outer Box
            >
                <Box>
                    <Box height="40vh" width="100%" justifyContent="center" alignItems="center">
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
                </Box>
                <Box>
                    <TextPart />
                    <BottomPart />
                </Box>
            </Box>

        )
    } else if (type === 'single') {
        return (
            <Box
                width="80vw"
                backgroundColor="#1C1C20"
                borderRadius="20px"
            >
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
                        alt={post.image.source}
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
        )
    } else if (type === 'smallImageLeft') {
        return (
            <Box
                width="80vw"
                backgroundColor="#1C1C20"
                borderRadius="20px"
            >
                <Flex alignItems="center">
                    <Box
                        ml={4}
                        minWidth={"400px"}
                        minHeight={"40vh"}
                        width="37vw"
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"center"}
                    >
                        <Image
                            borderRadius="20px"
                            src={post.image?.src}
                            alt={post.image.source}
                            height="100%"

                            width="100%"
                            objectFit="cover"
                            p={2}

                        />
                    </Box>
                    <Box>
                        <TextPart />
                        <BottomPart />
                    </Box>
                </Flex>
            </Box>


        )
    } else if (type === 'smallImageRight') {
        return (
            <Box
                width="80vw"
                backgroundColor="#1C1C20"
                borderRadius="20px"
            >
                <Flex alignItems="center">
                    <Box>
                        <TextPart />
                        <BottomPart />
                    </Box>
                    <Box
                        ml={4}
                        width="37vw"
                        minWidth={"400px"}
                        minHeight={"40vh"}
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"center"}
                    >
                        <Image
                            borderRadius="20px"
                            src={post.image?.src}
                            alt={post.image.source}
                            height="100%"
                            width="100%"
                            objectFit="cover"
                            p={2}
                        />
                    </Box>
                </Flex>
            </Box>
        )
    }


    return (
        <>
            Opsie
        </>
    )
}