import {
  VStack,
  Heading,
  Input,
  chakra,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Form } from "../components/Form";
import { FieldValues, useForm } from "react-hook-form";

export function PostUploadPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function handleUploadFormSubmit(values: FieldValues) {
    alert(values);
  }

  return (
    <chakra.div width={"100%"} height={"100%"} paddingX={5}>
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
          helperText="Title of the post"
          errorText={errors.title?.message?.toString()}
          isInvalid={!!errors.title}
        >
          <Input
            focusBorderColor="accent.base"
            color={"white"}
            placeholder="Teaser"
            {...register("title", { required: "Der Titel ist erforderlich" })}
          />
        </Form>
        <Form
          color="white"
          isRequired
          label="Teaser"
          helperText="Teaser of the post"
          errorText={errors.root?.message ?? "gi"}
          isInvalid={errors.teaser !== undefined}
        >
          <Input
            focusBorderColor="accent.base"
            color={"white"}
            placeholder="Teaser"
            {...register("teaser", { required: "Der Teaser ist erforderlich" })}
          />
        </Form>
        <Heading size={"md"} width={"100%"} textAlign={"left"}>
          Bild
        </Heading>
        <Form color="white" label="Image" helperText="Image of the post">
          <chakra.input
            type="file"
            accept="image/*"
            {...register("image")}
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
        >
          <Input
            focusBorderColor="accent.base"
            color={"white"}
            placeholder="Bild beschreibung"
            {...register("imageDescription")}
          />
        </Form>
        <Form color="white" label="Bild quelle" helperText="Bild quelle">
          <Input
            focusBorderColor="accent.base"
            color={"white"}
            placeholder="Bild quelle"
            {...register("imageSource")}
          />
        </Form>
        <Heading size={"md"} width={"100%"} textAlign={"left"}>
          Artikel
        </Heading>
        <Form
          color="white"
          isRequired
          label="Artikel"
          errorText={errors.article?.message?.toString()}
          isInvalid={!!errors.article}
        >
          <Textarea
            focusBorderColor="accent.base"
            color={"white"}
            placeholder="Artikel"
            {...register("article", {
              required: "Der Artikel ist erforderlich",
            })}
          />
        </Form>
        <Button onClick={() => handleSubmit(handleUploadFormSubmit)}>
          Hochladen
        </Button>
      </VStack>
    </chakra.div>
  );
}
