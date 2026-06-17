import { Routes, Route, RouterProvider } from "react-router-dom";
import Home from "./components/layout/Home/Home";
import Cart from "./components/Cart";
import Error404 from "./components/Error404";
import Login from "./components/Login-Register/Login";
import Router from "./Routes/RouteIndex";
import { Suspense } from "react";
import Loader from "./components/common/Loader";
function App() {
  const router = Router();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
