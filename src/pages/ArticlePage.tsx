import {
  LoaderFunctionArgs,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getAllPosts, getArticleById, getPostById } from "../repo/repo";
import { Post } from "../types/Post";
import { Article } from "../types/Article";
import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { CiBookmark, CiClock1, CiVolumeHigh } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { SingleArticleContainer } from "../components/HomePage/SingleArticleContainer";
import { Utils } from "../dateUtils";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
  const [olderPosts, setOlderPosts] = useState<Post[]>([]);
  const [readingTime, setReadingTime] = useState<number>(0);
  const navigate = useNavigate();

  enum ArticleStyle {
    Double = "double",
    Single = "single",
    SmallImageLeft = "smallImageLeft",
    SmallImageRight = "smallImageRight",
  }

  const Article = ({ post, index }: { post: Post; index: number }) => {
    let articleStyleClass: ArticleStyle = ArticleStyle.Double;
    let pattern = [];

    pattern = [ArticleStyle.Single];

    articleStyleClass = pattern[index % pattern.length];

    return (
      <SingleArticleContainer
        post={post}
        type={articleStyleClass as "smallImageLeft" | "smallImageRight"}
      />
    );
  };
  const location = useLocation();

  useEffect(() => {
    getAllPosts()
      .then((posts) => {
        const sortedPosts = posts;
        if (sortedPosts.length === 0) throw new Error("No posts found");
        const currentArticleId = post.id;
        const latestPostId = sortedPosts[0]?.id;
        const olderPosts = sortedPosts.filter(
          (post) => post.id !== currentArticleId && post.id !== latestPostId
        );
        const topTwoOlderPosts = olderPosts.slice(0, 2);
        setOlderPosts(topTwoOlderPosts);
      })
      .catch((error) => {
        console.error(error);
      });
    let text = textRef.current?.innerText;
    let wordCount: any = text?.split(/\s/).filter(function (n) {
      return n !== "";
    }).length;
    setReadingTime(Math.ceil(wordCount / 200));
    // scroll to top
    window.scrollTo(0, 0);
  }, [location]);
  function handleBookmark(id: string): void {
    throw new Error("Function not implemented.");
  }

  const textRef = useRef<HTMLDivElement | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(
    new SpeechSynthesisUtterance(textRef.current?.innerText ?? "")
  );
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!article || !textRef.current) return;
    speechSynthesisRef.current!.text = textRef.current.innerText ?? "";

    speechSynthesisRef.current!.lang = "de-DE";
    speechSynthesisRef.current!.rate = 1;
    speechSynthesisRef.current!.pitch = 1;
    speechSynthesisRef.current!.volume = 1;
  }, [article]);

  function startSpeaking(): void {
    setSpeaking(true);
    speechSynthesis.speak(speechSynthesisRef.current!);
    speechSynthesisRef.current!.onend = () => {
      setSpeaking(false);
    };
  }

  useEffect(() => {
    () => {
      speechSynthesis.cancel();
    };
  });

  function stopSpeaking(): void {
    speechSynthesis.cancel();
    setSpeaking(false);
  }
  return (
    <>
      <Container maxW="container.lg">
        <HStack
          color={"white"}
          align={"center"}
          cursor={"pointer"}
          onClick={() => navigate(-1)}
        >
          <Icon aria-label="Zurück" as={ArrowBackIcon} />
          <Text variant={"ghost"}>Zurück</Text>
        </HStack>
        <Flex my={10}>
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
        <Flex justifyContent="space-between" my={4}>
          <HStack gap={3} align={"top"}>
            <Text mb={2} color="grey">
              {post.author}
            </Text>
            <Text color="grey">
              {!!post.published_at &&
                Utils.formatMessageDate(post.published_at)}
            </Text>
          </HStack>
          <Text mb={2} color="grey"></Text>
          <HStack gap={"18px"}>
            <Tooltip label="Lesezeit">
              <Flex color={"gray"} align={"center"}>
                <Text
                  color="grey"
                  _hover={{ cursor: "pointer" }}
                  marginRight={2}
                >
                  {readingTime} min
                </Text>
                <Icon
                  _hover={{ cursor: "pointer" }}
                  as={CiClock1}
                  boxSize={5}
                />
              </Flex>
            </Tooltip>
            <Tooltip label="Vorlesen">
              <Flex color={"gray"} align={"center"}>
                <Text
                  color={"grey"}
                  onClick={speaking ? stopSpeaking : startSpeaking}
                  _hover={{ cursor: "pointer" }}
                  marginRight={2}
                >
                  {speaking ? "Pausieren" : "Vorlesen"}
                </Text>
                <Icon as={CiVolumeHigh} boxSize={5} />
              </Flex>
            </Tooltip>
          </HStack>
        </Flex>
        <Image
          src={post.image?.src}
          alt={post.image?.description}
          mb={4}
          borderRadius={10}
          width="100%"
          maxH="70vh"
          fit={"cover"}
        />
        <Flex justifyContent="space-between">
          <Text mb={2} color="grey" fontStyle={"italic"}>
            {post.image?.description}
          </Text>
          <Tooltip label={new URL(post.image!.source).host}>
            <Link href={post.image?.source} target="_blank" mb={2} color="grey">
              Quelle
            </Link>
          </Tooltip>
        </Flex>
        <Divider />
        <chakra.div mt={8} mb={4} color="#FFFFFF">
          <Container ref={textRef} maxW="80vw">
            {article.text.split("\n").map((paragraph, index) => (
              <chakra.div key={index}>
                <ReactMarkdown
                  skipHtml
                  components={ChakraUIRenderer()}
                  key={index}
                >
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
          <Text>Ältere Artikel</Text>
        </Box>
      </Container>
      <Box marginLeft="10vw">
        {olderPosts.map((post, index) => (
          <Article key={index} post={post} index={index} />
        ))}
      </Box>
    </>
  );
}
