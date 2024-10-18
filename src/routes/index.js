import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

const routes = [
  {
    path: "/",
    component: Home,
  },
];

export default routes;
