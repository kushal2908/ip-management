import { useState } from "react";
import Loader from "../../component/loader/Loader";
import { Button, Card, CardBody, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Signup() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitSignup = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {loading && <Loader />}
      <Flex height={"90vh"} justify={"center"} align={"center"}>
        <Card width={{ base: "320px", md: "400px" }} variant="outline">
          <CardBody>
            <Text fontWeight={500} fontSize={"xl"} mb="4">
              Signup
            </Text>
            <form onSubmit={submitSignup}>
              <FormControl mb="4" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl mb="4" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" w={"100%"}>
                Signin
              </Button>
            </form>

            <Text mt="8" fontSize={"sm"}>
              {"Already have an account?"}{" "}
              <Link to="/signin">
                <Text as={"span"} fontWeight="500" color={"teal"}>
                  Login
                </Text>
              </Link>
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
