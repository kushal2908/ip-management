import { Button, Card, CardBody, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../component/loader/Loader";
import { SUCCESS_TOAST } from "../../component/toast/Toastmsg";
import { axiosPublic } from "../../utils/auth";

export default function Signup() {
  // eslint-disable-next-line no-unused-vars
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const submitSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosPublic
      .post("/auth/signup", { name, password })
      .then((res) => {
        console.log(res);
        toast(SUCCESS_TOAST(res?.data?.msg + " Please signin"));
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err?.response?.data?.msg);
      })
      .finally(() => {
        setLoading(false);
      });
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
              <FormControl mb="4" isRequired isInvalid={errMsg}>
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
                <FormErrorMessage>{errMsg}</FormErrorMessage>
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
              <Button type="submit" colorScheme="teal" w={"100%"} isLoading={loading} loadingText="Signing up...">
                Signup
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
