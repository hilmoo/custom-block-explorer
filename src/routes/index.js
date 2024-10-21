import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const BlockList = lazy(() => import("../pages/BlockList"));
const Transactions = lazy(() => import("../pages/Transactions"));

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
    path: "/block-list",
    component: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <BlockList />
      </Suspense>
    ),
  },
  {
    path: "/txs",
    component: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <Transactions />
      </Suspense>
    ),
  },
];

export default routes;
