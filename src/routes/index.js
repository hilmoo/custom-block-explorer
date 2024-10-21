import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Blocks = lazy(() => import("../pages/Blocks"));

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/blocks",
    component: <Blocks />,
  },
];

export default routes;
