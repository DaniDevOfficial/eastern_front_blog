
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAllPosts, getArticleById, getPostById } from "../repo/repo";
import { Post } from "../types/Post";
import { Article } from "../types/Article";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
  Text,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { CiBookmark, CiClock1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { SingleArticleContainer } from "../components/HomePage/SingleArticleContainer";

interface LoaderData {
  post: Post;
  article: Article;
}

export async function loadPost({ params }: LoaderFunctionArgs) {
  const id = params.id as string;
  let post: Post;
  let article: Article;
  try {
    post = await getPostById(id);

  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  try {

    article = await getArticleById(post.article_id);

  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return { post: post, article: article } as LoaderData;
}

let articlev2 = await getArticleById("bMvD8RKtpCZ8bKRcFXUt");
console.log(articlev2)
export function ArticlePage() {
  const { post, article } = useLoaderData() as LoaderData;
  const [olderPosts, setOlderPosts] = useState<Post[]>([]);
  const screen = useBreakpointValue({ base: "base", sm: "sm", md: "md", lg: "lg", xl: "xl" });

  enum ArticleStyle {
    Double = 'double',
    Single = 'single',
    SmallImageLeft = 'smallImageLeft',
    SmallImageRight = 'smallImageRight',
  }

  const Article = ({ post, index }: { post: Post; index: number }) => {
    let articleStyleClass: ArticleStyle = ArticleStyle.Double;
    let pattern = []

    pattern = [
      ArticleStyle.Single,
    ]

    articleStyleClass = pattern[index % pattern.length];

    return (
      <SingleArticleContainer
        post={post}
        type={articleStyleClass as "smallImageLeft" | "smallImageRight"}
      />
    );
  };

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        const sortedPosts = posts
        if (sortedPosts.length === 0) throw new Error("No posts found");
        const latestPostId = sortedPosts[0]?.id;
        const olderPosts = sortedPosts.filter((post) => post.id !== latestPostId);
        const topTwoOlderPosts = olderPosts.slice(0, 2);
        setOlderPosts(topTwoOlderPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function handleBookmark(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Container maxW="container.lg" mt="10vh">
        <Flex
          mb={10}
        >
          <Heading as="h1" size="2xl" mb={4}>
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
        <Text color="#FFFFFF" mb={2}>
          {post.subtitle}
        </Text>
        <Divider />
        <Flex
          justifyContent="space-between"

          alignItems="center"
          mt={4}
          mb={4}
        >

          <Text mb={2}
            color="grey"

          >
            Sanju Para
          </Text>
          <Text mb={2}
            color="grey"

          >
          </Text>
          <Flex>

            <Text mb={2}
              color="grey"

            >
              6 min
              <Icon
                _hover={{ cursor: "pointer" }}
                as={CiClock1}
                ml={2}
                boxSize={5}
              />
            </Text>
          </Flex>
        </Flex>
        <Image
          src={post.image.src}
          alt={post.image.description}
          mb={4}
          borderRadius={10}
          width="100%"
          maxH="70vh"
          fit={"cover"}
        />
        <Flex
          justifyContent="space-between"

        >
          <Text mb={2}
            color="grey"

          >
            {post.image.description}
          </Text>
          <Text mb={2}
            color="grey"

          >
            {post.image.source}
          </Text>
        </Flex>
        <Divider />
        <chakra.div
          mt={8}
          mb={4}
          color="#FFFFFF"
        >
      <Container>
        {article.text
          .replaceAll("\\n", "\n")
          .split("\n")
          .map((paragraph, index) => (
            <chakra.div key={index}>
              <ReactMarkdown components={ChakraUIRenderer()} key={index}>
                {paragraph}
              </ReactMarkdown>
            </chakra.div>
          ))}
      </Container>

        </chakra.div>

        <Box
          className="hr-lines"
          maxW="500px"
          mx="auto"
          my="40px"
          textAlign="center"
          position="relative"
        >
          <Box
            as="span"
            pos="absolute"
            top="50%"
            left="0"
            transform="translateY(-50%)"
            h="2px"
            w={{ md: "130px", base: "100px" }}
            bg="#FEC709"
            display="block"
            content=""
          />
          <Box
            as="span"
            pos="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            h="2px"
            w={{ md: "130px", base: "100px" }}
            bg="#FEC709"
            display="block"
            content=""
          />
          Ältere Artikel
        </Box>

      </Container>
      <Box
            marginLeft="10vw"

      >
        {olderPosts.map((post, index) => (
          <Article
            key={index} post={post} index={index} />
        ))}
      </Box>
    </>
  );
}
