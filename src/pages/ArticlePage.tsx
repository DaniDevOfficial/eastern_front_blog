
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
    post = {
      "article_id": "bMvD8RKtpCZ8bKRcFXUt",
      "id": "BoXwv6a33wvYUf5q2kTa",
      "image": {
        "id": "JMSz06sqDtNB7EZE2xtQ",
        "src": "https://firebasestorage.googleapis.com/v0/b/eastern-front-blog.appspot.com/o/articles%2Fimages%2FSoldaten.jpeg?alt=media&token=5b96f395-30fc-4b47-86ba-7687817e3f5a",
        "source": "test.de",
        "description": "Soldaten"
      },
      "published_at": "20 Feb 2021",
      "author": "Sanju Para",
      "subtitle": "Russland positioniert 40.000 Soldaten für entscheidenden Angriff auf Awdijiwka. In einer brisanten Entwicklung mobilisiert Russland Truppen an der Front in Awdijiwka, was von Beobachtern als potenzielle 'tödliche Sackgasse' mit drohenden 'kolossalen Verlusten' bezeichnet wird. Kiew – Trotz erheblicher Verluste zeigt sich Russland unbeeindruckt von der Situation in Awdijiwka.",
      "title": "Russland positioniert 40.000 Soldaten für entscheidenden Angriff auf Awdijiwka"
    } // can cahnge to getPostById(id)


  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  try {
    article = {
      "id": "bMvD8RKtpCZ8bKRcFXUt",
      "text": " Russland positioniert 40.000 Soldaten für entscheidenden Angriff auf Awdijiwka In einer brisanten Entwicklung mobilisiert Russland Truppen an der Front in Awdijiwka, was von Beobachtern als potenzielle \"tödliche Sackgasse\" mit drohenden \"kolossalen Verlusten\" bezeichnet wird. Kiew – Trotz erheblicher Verluste zeigt sich Russland unbeeindruckt von der Situation in Awdijiwka. Bürgermeister Witali Barabasch warnt vor einer bevorstehenden \"dritten Angriffswelle\", und Berichte besagen, dass Russland plant, 40.000 Soldaten in der Stadt zu konzentrieren. Der Tagesspiegel zitiert ukrainische Quellen, die bereits fast 7.000 verlorene russische Soldaten an dieser Front melden, während der Kyiv Independent von einer möglichen 'tödlichen Sackgasse' spricht, in der Russlands Panzer in Awdijiwka in einem Hinterhalt geraten. Russland versucht offenbar, seine erschöpften Ressourcen sowohl an Material als auch an Personal in Awdijiwka wieder aufzufüllen, so der Bürgermeister. Unabhängige Überprüfungen der ukrainischen Angaben stehen noch aus. Der Bericht des US-Instituts für Kriegsstudien (ISW) im Oktober deutete jedoch darauf hin, dass Russland erhebliche Verluste in Ausrüstung und Personal erlitten hat. Ein Sieg in Awdijiwka wäre jedoch hauptsächlich symbolischer Natur im Kontext des Ukraine-Konflikts. Die Einschätzungen des ukrainischen Militärexperten Alexander Kowalenko weisen darauf hin, dass die Offensive in Awdijiwka möglicherweise als Ablenkungsmanöver dient, um die Gegenoffensive in der Region Saporischschja zu verschleiern. Kowalenko betonte, dass Russland im Sommer ähnliche Taktiken in anderen Gebieten angewendet habe, um die ukrainischen Streitkräfte abzulenken. Er geht davon aus, dass die russische Armee nun Einheiten aus der Region Luhansk verlegt. Die Aussichten für Russlands Kampf um Awdijiwka hängen laut Kowalenko von der \"Opferbereitschaft\" Moskaus ab. Er betont, dass es keine Verteidigung gibt, die nicht durchbrochen werden kann, und dass der Erfolg von den mobilisierten Ressourcen abhängt. Wenn Russland in Awdijiwka Fortschritte erzielen will, könnte dies jedoch mit erheblichen Verlusten einhergehen. Awdijiwka in der Ostukraine ist seit Beginn des Konflikts 2014 umkämpft. Die Stadt, einst Heimat von über 30.000 Einwohnern, beherbergt derzeit etwa 1600 Menschen. Russlands Bestrebungen in dieser Region bleiben ein entscheidender Faktor im anhaltenden Ukraine-Konflikt."
    } // can change to getArticleById(id)

  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return { post: post, article: article } as LoaderData;
}

export function ArticlePage() {
  const { post, article } = useLoaderData() as LoaderData;
  const [olderPosts, setOlderPosts] = useState([]);


  enum ArticleStyle {
    Double = 'double',
    Single = 'single',
    SmallImageLeft = 'smallImageLeft',
    SmallImageRight = 'smallImageRight',
  }

  const Article = ({ post, index }: { post: Post; index: number }) => {
    let articleStyleClass: ArticleStyle = ArticleStyle.Double;

    const pattern = [

      ArticleStyle.SmallImageLeft,
      ArticleStyle.SmallImageRight,

    ];

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
        console.log(posts);
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
            {post.author}
          </Text>
          <Text mb={2}
            color="grey"

          >
            {post.published_at}
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
          <ReactMarkdown
            components={ChakraUIRenderer()}
          >
            {article.text}
          </ReactMarkdown>
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
        {olderPosts.map((post, index) => (
          <Article
            key={index} post={post} index={index} />
        ))}
      </Container>

    </>
  );
}
