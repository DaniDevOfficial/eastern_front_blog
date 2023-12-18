import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { ArticlePage, loadPost } from "./ArticlePage";
import { HomePage } from "./HomePage";
import { PageLayout } from "./PageLayout";
import { AdminPage } from "./AdminPage";
import { PostUploadPage } from "./PostUploadPage";

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
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/upload/post",
        element: <PostUploadPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export function RouterWrapper() {
  return <RouterProvider router={router} />;
}
