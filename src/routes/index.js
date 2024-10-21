import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Blocks = lazy(() => import("../pages/Blocks"));

const routes = [
  {
    path: "/",
    component: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/blocks",
    component: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <Blocks />
      </Suspense>
    ),
  },
];

export default routes;
