import { Box, Heading } from "@chakra-ui/react";
import Content from "../../component/content/Content";

export default function Address() {
  return (
    <>
      <Box mt={6}>
        <Heading size="md" color={"gray.800"}>
          Address
        </Heading>
        <Content></Content>
      </Box>
    </>
  );
}
