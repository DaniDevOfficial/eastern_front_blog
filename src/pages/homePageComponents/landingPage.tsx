import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../repo/repo';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Post } from '../../types/Post';
export function LandingPage() {
    const [latestPost, setLatestPost] = useState<Post>();

    useEffect(() => {
        getAllPosts().then((posts) => {
            const post = posts[0];
            setLatestPost(post);
            console.log(posts)
        });
    }, []);

    return (
        <Box
            position="relative"
            height="100vh"
            backgroundImage={latestPost ? `url(${latestPost.image?.src})` : 'url(placeholder.jpg)'}
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
                <Heading>{latestPost ? latestPost.title : 'Loading...'}</Heading>
                <Text>{latestPost ? latestPost.subtitle : 'Fetching latest post...'}</Text>
            </Box>
        </Box>
    );
}
