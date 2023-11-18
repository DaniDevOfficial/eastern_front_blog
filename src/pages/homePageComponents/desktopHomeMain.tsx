import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../repo/repo';
import { Box, Heading, Text, Image, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { CiShare2 } from 'react-icons/ci';

export function DesktopHomeMain({ posts }) {
    const location = useLocation();
    const currentUrl = window.location.origin + location.pathname;

    const handleCopyLink = (postId) => {
        const linkToCopy = `${currentUrl}posts/${postId}`;
        navigator.clipboard.writeText(linkToCopy);
    };
    return (
        <Box position="relative" background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))" >

            {posts.map((post) => (
                <Box key={post.id} display="flex" width="100%" minHeight="0vh" padding="100px 0" flexWrap="wrap">
                {/* Left Container */}
                    <Box flex="1" padding="4">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            {post.image && <Image src={post.image?.src} alt={post.image.alt} maxW="100%" maxH="100%" />}
                        </Box>
                        <Box mt="4" bg="gray.700" p="2" borderRadius="md">
                        <Icon as={CiShare2} onClick={() => handleCopyLink(post.id)}   cursor="pointer" marginLeft="10px"/>
                        </Box>
                    </Box>

                    {/* Right Container */}
                    <Box flex="1" padding="4">
                        <Heading>{post.title}</Heading>
                        <Text>
                            Author: {post.author} | Posted on: {post.published_at && post.published_at.toISOString()}
                        </Text>
                        <Text>{post.subtitle}</Text>
                        <ChakraLink
                            as={ReactRouterLink}
                            to={`/posts/${post.id}`}
                            display="flex"
                            alignItems="center"
                            color="teal.500"
                            _hover={{ color: 'teal.700' }}
                        >
                            Mehr lesen
                            <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
                        </ChakraLink>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
