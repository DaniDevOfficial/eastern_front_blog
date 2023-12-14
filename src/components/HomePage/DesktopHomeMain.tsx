import {
  Flex,
} from "@chakra-ui/react";

import { Post } from "../../types/Post";
import { SingleArticleContainer } from "./SingleArticleContainer";

interface MobileHomeMainProps {
  posts: Post[];
}

export function DesktopHomeMain({ posts }: MobileHomeMainProps) {
  const multipliedPosts = Array(5).fill(posts).flat();

  enum ArticleStyle {
    Double = 'double',
    Single = 'single',
    SmallImageLeft = 'smallImageLeft',
    SmallImageRight = 'smallImageRight',
  }

  const Article = ({ post, index }: { post: Post; index: number }) => {
    let articleStyleClass: ArticleStyle = ArticleStyle.Double;

    const pattern = [
      ArticleStyle.Double,
      ArticleStyle.Double,
      ArticleStyle.Single,
      ArticleStyle.SmallImageLeft,
      ArticleStyle.SmallImageRight,
      ArticleStyle.Double,
      ArticleStyle.Double,
      ArticleStyle.Single,
      ArticleStyle.SmallImageLeft,
      ArticleStyle.SmallImageRight,
    ];

    articleStyleClass = pattern[index % pattern.length];

    return (
      <SingleArticleContainer
      
        post={post}
        type={articleStyleClass as "double" | "single" | "smallImageLeft" | "smallImageRight"}
      />
    );
  };

  return (
    <Flex
      flexWrap="wrap"
      marginLeft="10vw"
      mt="10vh"
      gap="5vw"
    >
      {multipliedPosts.map((post, index) => (
        <Article 
        key={index} post={post} index={index} />
      ))}
    </Flex>
  );
}
