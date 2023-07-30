import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./chakra/globalTheme.js";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={globalTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
