import { useBreakpointValue } from "@chakra-ui/react";
import { DesktopHomeMain } from "./DesktopHomeMain";
import { MobileHomeMain } from "./MobileHomeMain";
import { Post } from "../../types/Post";

interface HomeMainProps {
  posts: Post[];
}

export function HomeMain({ posts }: HomeMainProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <MobileHomeMain posts={posts} />
      ) : (
        <DesktopHomeMain posts={posts} />
      )}
    </>
  );
}
