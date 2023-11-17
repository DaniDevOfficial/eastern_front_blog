import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../repo/repo';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

export function HomeMain() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((fetchedPosts) => {
            const duplicatedPosts = Array.from({ length: 5 }, (_, index) => ({ ...fetchedPosts[0], id: `${fetchedPosts[0].id}_${index}` }));
            setPosts(duplicatedPosts);
        });
    }, []);

    return (
        <Box  position="relative"  background="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))" >
            
            {posts.map((post) => (
                <Box key={post.id} display="flex" width="100%" minHeight="0vh" padding="100px 0">
                    <Box flex="1" padding="4">
                        <Box display="flex" alignItems="center" justifyContent="center">
                            {post.image && <Image src={post.image?.src} alt={post.image.alt} maxW="100%" maxH="100%" />}
                        </Box>
                        <Box mt="4" bg="gray.700" p="2" borderRadius="md">
                            Likes: (für später)
                        </Box>
                    </Box>

                    {/* Right Container */}
                    <Box flex="1" padding="4">
                        <Heading>{post.title}</Heading>
                        <Text>
                            Author: {post.author} | Posted on: {post.published_at && post.published_at.toISOString()}
                        </Text>
                        <Text>{post.subtitle}</Text>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
