import { Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { isAdmin } from "../repo/repo";

export function AdminRoute() {
  const navigage = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigage("/");
        window.location.reload();
        return;
      }
      isAdmin(user.uid).then((isAdmin) => {
        if (!isAdmin) {
          navigage("/");
          window.location.reload();
        }
      });
    });
    return () => {
      unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  return <Outlet />;
}
