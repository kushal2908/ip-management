import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Layout from "./component/Layout/Layout";
// import Index from "./pages/Index";
import Address from "./pages/Address/Address";
import Landing from "./pages/Landing/Landing";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/home"} element={<Address />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
