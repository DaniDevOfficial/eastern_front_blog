import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ArticlePage, loadPost } from "./ArticlePage";
import { HomePage } from "./HomePage";
import { Box } from "@chakra-ui/react";

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
    <Box
    bgColor="#141417"

    >
      <RouterProvider router={router} />
    </Box>
  );
}
