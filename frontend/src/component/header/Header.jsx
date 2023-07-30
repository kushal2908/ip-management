import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getToken, removeToken } from "../../utils/token";
export default function Header() {
  return (
    <Box bg="white" w="100%">
      <Container maxW="container.xl">
        <Flex justify={"space-between"} align={"center"} minH="60px">
          <Link to="/">
            <Text fontWeight={500}>IP Management</Text>
          </Link>
          <Flex gap={2}>
            {getToken() ? (
              <Button colorScheme="red" size="sm" onClick={() => removeToken()}>
                Signout
              </Button>
            ) : (
              <>
                <Link to="/Signin">
                  <Button colorScheme="teal" size="sm">
                    Signin
                  </Button>
                </Link>
                <Link to="/Signup">
                  <Button size="sm">Signup</Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
