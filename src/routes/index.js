import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const BlockList = lazy(() => import("../pages/BlockList"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Block = lazy(() => import("../pages/Block"));

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
      <Suspense fallback={<div>Loading Block List...</div>}>
        <BlockList />
      </Suspense>
    ),
  },
  {
    path: "/block/:id",
    component: (
      <Suspense fallback={<div>Loading Block...</div>}>
        <Block />
      </Suspense>
    ),
  },
  {
    path: "/txs",
    component: (
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions />
      </Suspense>
    ),
  },
];

export default routes;
