import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../repo/repo';
import { useBreakpointValue } from '@chakra-ui/react';
import { DesktopHomeMain } from './DesktopHomeMain';
import { MobileHomeMain } from './mobileHomeMain';

export function HomeMain() {
    const [posts, setPosts] = useState([]);
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        getAllPosts().then((fetchedPosts) => {
            const duplicatedPosts = Array.from(
                { length: 5 },
                (_, index) => ({ ...fetchedPosts[0], id: `${fetchedPosts[0].id}_${index}` })
            );
            setPosts(duplicatedPosts);
        });
    }, []);

    return (
        <>
            {isMobile ? <MobileHomeMain posts={posts} /> : <DesktopHomeMain posts={posts} />}
        </>
    );
}
