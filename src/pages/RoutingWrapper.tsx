import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ArticlePage, loadPost } from "./ArticlePage";
import { HomePage } from "./HomePage";

export function RouterWrapper() {
  const router = createBrowserRouter([
    {
      path: "/",
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
