import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Flex direction={"column"} h={"90vh"} justify={"center"} align={"center"}>
        <Text fontWeight={700} textAlign={"center"} fontSize={{ base: "4xl", md: "7xl" }}>
          IP management{" "}
          <Text as={"span"} color={"teal.400"}>
            made easy
          </Text>
        </Text>
        <Text fontWeight={500} color={"gray.400"} textAlign={"center"} fontSize={"xl"} mt="2  ">
          Track every IP in your network, store, label and update when it requires.
        </Text>
        <Flex gap={2} mt="4">
          <Link to="/Signin">
            <Button colorScheme="teal">Signin</Button>
          </Link>
          <Link to="/Signup">
            <Button>Signup</Button>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}
