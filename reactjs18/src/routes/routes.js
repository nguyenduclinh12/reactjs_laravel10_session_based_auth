import Dashboard from "../components/backend/Dashboard";
import Home from "../components/frontend/Home";
import BackendLayout from "../layouts/backend/BackendLayout";
import FrontendLayout from "../layouts/frontend/FrontendLayout";
import Register from "./../components/backend/auth/register";
import Login from "./../components/backend/auth/login";
import PrivateRoutes from "./PrivateRoutes";
import Product from "../components/backend/Product";
import ProductCreate from "../components/backend/Product/New";
import ProductUpdate from "../components/backend/Product/Edit";
import Roles from "../components/backend/Roles";
import RoleCreate from "../components/backend/Roles/New";
import RoleUpdate from "../components/backend/Roles/Edit";
import ProductLayout from "../components/backend/Product/ProductLayout";
import Category from "../components/backend/Category";
import CategoryUpdate from "../components/backend/Category/Edit";
import CategoryCreate from "../components/backend/Category/New";
import History from "../components/backend/History";
import HistoryCreate from "../components/backend/History/New";
import HistoryUpdate from "../components/backend/History/Edit";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <BackendLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "category",
        // element:<ProductLayout />,
        children: [
          {
            index: true,
            element: <Category />,
          },
          {
            path: "create",
            element: <CategoryCreate />,
          },
          {
            path: ":id",
            element: <CategoryUpdate />,
          },
        ],
      },
      {
        path: "product",
        // element:<ProductLayout />,
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: ":id",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "tag",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: "update",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "post",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: "update",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "comment",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: "update",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "order",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: "update",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: "update",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "role",
        children: [
          {
            index: true,
            element: <Roles />,
          },
          {
            path: "create",
            element: <RoleCreate />,
          },
          {
            path: "update",
            element: <RoleUpdate />,
          },
        ],
      },
      {
        path: "history",
        children: [
          {
            index: true,
            element: <History />,
          },
          {
            path: "create",
            element: <HistoryCreate />,
          },
          {
            path: "update",
            element: <HistoryUpdate />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;
