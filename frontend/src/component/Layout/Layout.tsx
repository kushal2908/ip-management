import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Flex } from "@chakra-ui/react";
import Header from "../header/Header";

export default function Layout() {
  return (
    <Box minH={"90vh"}>
      <Header />
      <Container maxW="container.xl">
        <Outlet />
      </Container>
    </Box>
  );
}
