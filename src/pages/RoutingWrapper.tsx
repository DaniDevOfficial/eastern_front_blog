import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { ArticlePage, loadPost } from "./ArticlePage";
import { HomePage } from "./HomePage";
import { PageLayout } from "./PageLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true, // Same Route as Parent: "/"
        element: <HomePage />,
      },
      {
        path: "/post/:id",
        element: <ArticlePage />,
        loader: loadPost,
        errorElement: <div>Something went wrong</div>, // TODO: Replace this with a custom error page
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export function RouterWrapper() {

  return (
      <RouterProvider router={router} />
  );
}