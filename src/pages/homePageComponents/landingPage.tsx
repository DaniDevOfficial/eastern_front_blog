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
                <Heading>Ukrain Russia War</Heading>

            </Box>

            <Box
                position="absolute"
                bottom="0"
                right="0"
                textAlign={{ base: 'center', md: 'left' }} 
                paddingRight={{ base: '10vw', md: '70%' }}  
                paddingLeft={{ base: '10vw', md: '3vw' }}   
                color="white"
                paddingBottom={{ base: '2vh', md: '2vh' }}  
            >
                <Heading
                    fontSize={{ base: '1.3rem', md: '1.5rem' }} 
                    paddingBottom={{ base: '1vh', md: '1vh' }}
                >
                    {latestPost ? latestPost.title : 'Loading...'}
                </Heading>
                <Text
                    fontSize={{ base: '0.9rem', md: '1rem' }} 
                >
                    {latestPost ? latestPost.subtitle : 'Fetching latest post...'}
                </Text>
            </Box>

        </Box>
    );
}
