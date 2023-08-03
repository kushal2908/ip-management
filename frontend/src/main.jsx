import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./chakra/globalTheme.js";
import axios from "axios";
import { getToken } from "./utils/token.js";
import { createStandaloneToast } from "@chakra-ui/react";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;

const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={globalTheme}>
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
