import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { ArticlePage, loadPost } from "./ArticlePage";
import { HomePage } from "./HomePage";
import { PageLayout } from "./PageLayout";
import { Timeline } from "./Timline";
import { AdminPage } from "./AdminPage";
import { PostUploadPage } from "./PostUploadPage";
import { TimelineItemUploadPage } from "./TimelineItemUploadPage";
import { AdminRoute } from "../routes/AdminRoute";
import PrivacyPolicy from "../components/PrivacyPolicy";

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
        path: "/timeline",
        element: <Timeline />,
        errorElement: <div>Something went wrong</div>,
      },
      {
        path: "/datenschutz",
        element: <PrivacyPolicy />,
        errorElement: <div>Something went wrong</div>,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            index: true, // Same Route as Parent: "/admin"
            element: <AdminPage />,
          },
          {
            path: "/admin/upload/post",
            element: <PostUploadPage />,
          },
          {
            path: "/admin/upload/timeline",
            element: <TimelineItemUploadPage />,
          },
          {
            path: "*",
            element: <Navigate to="/admin" />,
          },
        ],
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
