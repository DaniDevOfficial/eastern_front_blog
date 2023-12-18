import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export function AdminPage() {
  const navigage = useNavigate();

  return (
    <Flex width={"100%"} justify={"center"}>
      <ButtonGroup gap={5}>
        <Button onClick={() => navigage("/admin/upload/post")}>
          Upload Article
        </Button>
        <Button>Upload Timeline Item</Button>
      </ButtonGroup>
    </Flex>
  );
}
