import {
  Button,
  Heading,
  Input,
  VStack,
  chakra,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "../components/Form";
import { createTimelineItem } from "../repo/repo";

export function TimelineItemUploadPage() {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [link, setLink] = useState<string>();
  const [dateOfVisit, setDateOfVisit] = useState<string>();

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleUploadFormSubmit() {
    setTriedToSubmit(true);
    if (
      isInvalidString(title) ||
      isInvalidString(description) ||
      isInvalidString(link) ||
      isInvalidString(date) ||
      isInvalidString(dateOfVisit)
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await createTimelineItem({
        title: title!,
        description: description!,
        link: link!,
        date: date!,
        readat: dateOfVisit!,
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
      setTitle("");
      setDescription("");
      setLink("");
      setDate("");
      setDateOfVisit("");
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

  return (
    <chakra.div width={"100%"} paddingX={{ base: 2, md: 10, lg: 15 }}>
      <Heading textAlign={"center"} h="100">
        Timeline Item hochladen
      </Heading>
      <VStack gap={5}>
        <Form
          color="white"
          isRequired
          label="Datum"
          helperText="Datum des Timeline Items"
          errorText={"Das Datum ist erforderlich"}
          isInvalid={triedToSubmit && isInvalidString(date)}
        >
          <Input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="Wähle das Datum"
            size="md"
            type="datetime-local"
          />
        </Form>
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
          label="Beschreibung"
          helperText="Beschreibung des Timeline Items"
          errorText={"Die Beschreibung ist erforderlich"}
          isInvalid={triedToSubmit && isInvalidString(description)}
        >
          <Textarea
            color={"white"}
            placeholder="Beschreibung"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </Form>
        <Form
          color="white"
          isRequired
          label="Link"
          helperText="Link des Timeline Items"
          errorText={"Der Link ist erforderlich"}
          isInvalid={triedToSubmit && isInvalidString(link)}
        >
          <Input
            placeholder="Link"
            onChange={(event) => setLink(event.target.value)}
            value={link}
          />
        </Form>
        <Form
          color="white"
          isRequired
          label="Datum des Link Besuchs"
          helperText="Datum des Besuchs des Links"
          errorText={"Das Datum des Besuchs ist erforderlich"}
          isInvalid={triedToSubmit && isInvalidString(dateOfVisit)}
        >
          <Input
            value={dateOfVisit}
            onChange={(event) => setDateOfVisit(event.target.value)}
            placeholder="Wähle das Datum des Besuchs"
            size="md"
            type="datetime-local"
          />
        </Form>
        <Button isDisabled={isLoading} onClick={handleUploadFormSubmit}>
          Hochladen
        </Button>
      </VStack>
    </chakra.div>
  );
}
