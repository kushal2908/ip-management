import { Alert, Button, Card, CardBody, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../utils/token";

export default function Signin() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submitSignin = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("auth/signin", { name, password })
      .then((res) => {
        setToken(res?.data?.token);
        navigate("/");
      })
      .catch((err) => {
        setErr(err?.response?.data?.msg);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Flex height={"90vh"} justify={"center"} align={"center"}>
        <Card width={{ base: "320px", md: "400px" }} variant="outline">
          <CardBody>
            <Text fontWeight={500} fontSize={"xl"} mb="4">
              Signin
            </Text>
            <form onSubmit={submitSignin}>
              <FormControl mb="4" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={loading}
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
                  disabled={loading}
                />
              </FormControl>
              {err && (
                <>
                  <Alert size="sm" status="error" mb={2} borderRadius={"md"}>
                    {err}
                  </Alert>
                </>
              )}
              <Button type="submit" colorScheme="teal" w={"100%"} isLoading={loading} loadingText="Signing in...">
                Signin
              </Button>
            </form>

            <Text mt="8" fontSize={"sm"}>
              {"Don't have an account?"}{" "}
              <Link to="/signup">
                <Text as={"span"} fontWeight="500" color={"teal"}>
                  Register here
                </Text>
              </Link>
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
