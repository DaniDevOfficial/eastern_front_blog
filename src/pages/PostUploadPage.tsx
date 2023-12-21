import {
  VStack,
  Heading,
  Input,
  chakra,
  Textarea,
  Button,
  Flex,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form } from "../components/Form";
import { ChangeEvent, useEffect, useState } from "react";
import { createPost } from "../repo/repo";
import { useNavigate } from "react-router-dom";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { getAuth } from "firebase/auth";

export function PostUploadPage() {
  const auth = getAuth();
  const [title, setTitle] = useState<string>();
  const [teaser, setTeaser] = useState<string>();
  const [image, setImage] = useState<File>();
  const [imageDescription, setImageDescription] = useState<string>();
  const [imageSource, setImageSource] = useState<string>();
  const [article, setArticle] = useState<string>();

  const [imagePreview, setImagePreview] = useState<string>();
  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleUploadFormSubmit() {
    setTriedToSubmit(true);
    if (
      isInvalidString(title) ||
      isInvalidString(teaser) ||
      isInvalidString(article) ||
      (image && isInvalidString(imageDescription)) ||
      isInvalidString(imageSource)
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const id = await createPost({
        title: title!,
        subTitle: teaser!,
        image: {
          file: image!,
          description: imageDescription!,
          source: imageSource!,
        },
        article: article!,
        author:
          auth.currentUser?.displayName ?? auth.currentUser?.email ?? undefined,
      });
      setIsLoading(false);
      toast({
        title: "Post erfolgreich hochgeladen",
        description: "Der Post wurde erfolgreich hochgeladen",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate(`/post/${id}`);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Fehler beim Hochladen des Posts",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  function isInvalidString(string: string | undefined) {
    return string === undefined || string.trim() === "";
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  function handleImageInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files && files.length > 0) {
      setImage(files[0]);
    } else {
      setImage(undefined);
    }
  }

  return (
    <chakra.div width={"100%"} height={"100%"} paddingX={5}>
      <Flex justify={"space-evenly"} direction={"row"} width={"100%"}>
        <chakra.div width={{ base: "100%", lg: "50%" }}>
          <Heading textAlign={"center"} h="100">
            Post Upload Page
          </Heading>
          <VStack gap={5}>
            <Heading size={"md"} width={"100%"} textAlign={"left"}>
              Vorschau
            </Heading>
            <Form
              color="white"
              isRequired
              label="Title"
              helperText="Titel des Posts"
              errorText={"Der Titel ist erforderlich"}
              isInvalid={triedToSubmit && isInvalidString(title)}
            >
              <Input
                placeholder="Titel"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </Form>
            <Form
              color="white"
              isRequired
              label="Teaser"
              helperText="Der Teaser des Posts"
              errorText={"Der Teaser ist erforderlich"}
              isInvalid={triedToSubmit && isInvalidString(teaser)}
            >
              <Input
                placeholder="Teaser"
                onChange={(event) => setTeaser(event.target.value)}
                value={teaser}
              />
            </Form>
            <Heading size={"md"} width={"100%"} textAlign={"left"}>
              Bild
            </Heading>
            <Form
              color="white"
              label="Image"
              helperText="Wähle ein Bild aus"
              errorText="Wähle ein Bild aus!"
              isInvalid={triedToSubmit && isInvalidString(image?.name)}
            >
              <chakra.input
                onChange={handleImageInputChange}
                type="file"
                accept="image/*"
                rounded={"md"}
                width={"100%"}
                color={"white"}
                border={"1px solid"}
                padding={2}
                cursor={"pointer"}
                _active={{
                  borderColor: "accent.base",
                }}
              />
            </Form>
            <Form
              color="white"
              label="Bild beschreibung"
              helperText="Bild beschreibung"
              errorText="Bitte gib eine Bild beschreibung an."
              isInvalid={
                triedToSubmit &&
                !isInvalidString(image?.name) &&
                isInvalidString(imageDescription)
              }
            >
              <Input
                placeholder="Bild beschreibung"
                onChange={(event) => setImageDescription(event.target.value)}
                value={imageDescription}
              />
            </Form>
            <Form
              color="white"
              label="Bild quelle"
              helperText="Bild quelle"
              errorText="Bitte gib eine Bild quelle an."
              isInvalid={
                triedToSubmit &&
                !isInvalidString(image?.name) &&
                isInvalidString(imageSource)
              }
            >
              <Input
                placeholder="Bild quelle"
                onChange={(event) => setImageSource(event.target.value)}
                value={imageSource}
              />
            </Form>
            <Heading size={"md"} width={"100%"} textAlign={"left"}>
              Artikel
            </Heading>
            <Form
              color="white"
              isRequired
              label="Artikel"
              helperText="Der Artikel des Posts"
              errorText={"Der Artikel ist erforderlich"}
              isInvalid={triedToSubmit && isInvalidString(article)}
            >
              <Textarea
                onChange={(event) => setArticle(event.target.value)}
                value={article}
                focusBorderColor="accent.base"
                color={"white"}
                placeholder="Artikel"
                rows={10}
              />
            </Form>
            <Button isDisabled={isLoading} onClick={handleUploadFormSubmit}>
              Hochladen
            </Button>
          </VStack>
        </chakra.div>
        <chakra.div
          padding={2}
          width={"50%"}
          display={{ base: "none", lg: "initial" }}
        >
          <Heading textAlign={"center"} h="100">
            Vorschau
          </Heading>
          <VStack gap={5}>
            <SkeletonText
              isLoaded={title !== undefined}
              width={"100%"}
              noOfLines={1}
            >
              <Heading size={"md"} width={"100%"} textAlign={"center"}>
                {title}
              </Heading>
            </SkeletonText>
            <SkeletonText isLoaded={teaser !== undefined} width={"100%"}>
              <Heading size={"sm"} width={"100%"} textAlign={"center"}>
                {teaser}
              </Heading>
            </SkeletonText>
            <Skeleton
              isLoaded={image !== undefined}
              width={"100%"}
              aspectRatio={"16 / 9"}
            >
              <Image src={imagePreview} alt={imageDescription} />
              <Flex justify={"space-between"} direction={"row"} width={"100%"}>
                <Text>{imageDescription}</Text>
                <Text fontStyle={"italic"} textAlign={"end"}>
                  {imageSource}
                </Text>
              </Flex>
            </Skeleton>
            <SkeletonText
              isLoaded={article !== undefined}
              noOfLines={10}
              width={"100%"}
            >
              {article?.split("\n").map((paragraph, index) => (
                <chakra.div key={index}>
                  <ReactMarkdown components={ChakraUIRenderer()} key={index}>
                    {paragraph}
                  </ReactMarkdown>
                </chakra.div>
              ))}
            </SkeletonText>
          </VStack>
        </chakra.div>
      </Flex>
    </chakra.div>
  );
}
