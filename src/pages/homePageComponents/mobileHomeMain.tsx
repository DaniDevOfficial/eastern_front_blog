import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../repo/repo';
import { Box, Heading, Text, Image, Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';

export function MobileHomeMain({ posts }) {
    return (
        <Box position="relative" background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))">
            {posts.map((post) => (
                <Box key={post.id} width="100%" minHeight="0vh" padding="50px 0">
                    <Heading textAlign="center">{post.title}</Heading>

                    <Text textAlign="center">
                        Author: {post.author} | Posted on: {post.published_at && post.published_at.toISOString()}
                    </Text>

                    <Box display="flex" justifyContent="center" mt="4">
                        {post.image && <Image src={post.image?.src} alt={post.image.alt} maxW="100%" maxH="100%" />}
                    </Box>

                    <Box mt="4" bg="gray.700" p="2" borderRadius="md" textAlign="center" margin="1vw ">
                        Likes: (für später)
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
                        _hover={{ color: 'teal.700' }}
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
