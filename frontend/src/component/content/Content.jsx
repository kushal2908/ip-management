import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
export default function Content({ children }) {
  return (
    <>
      <Box bg="white" borderRadius={"md"} px={4} py={4} mt={2} border="1px" borderColor={"gray.200"}>
        {children}
      </Box>
    </>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
