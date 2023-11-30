import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getArticleById, getPostById } from "../repo/repo";
import { Post } from "../types/Post";
import { Article } from "../types/Article";
import {
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  chakra,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

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

export function ArticlePage() {
  const { post, article } = useLoaderData() as LoaderData;
  return (
    <>
      <Container>
        <Heading textAlign={"center"}>{post.title}</Heading>
        <Text textAlign={"center"}>{post.subtitle}</Text>
        <Divider />
        <Flex justify={"center"}>
          {post.published_at && (
            <Text>Hochgeladen am {post.published_at?.toDateString()}</Text>
          )}
        </Flex>
        {post.image && (
          <Flex justify={"center"} direction={"column"}>
            <Image
              src={post.image.src}
              alt={post.image.description ?? "image..."}
            />
            <Flex justify={"space-between"}>
              <Text>{post.image.description ?? ""}</Text>
              <Spacer />
              <Text>{post.image.source}</Text>
            </Flex>
          </Flex>
        )}
      </Container>
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
    </>
  );
}
