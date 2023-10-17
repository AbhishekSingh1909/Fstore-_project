import { Fragment, useEffect } from "react";
import { HeaderDashBoard } from "./DashBoardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { NotAuthorized } from "../pages/NotAuthorisedUser";

export const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user && user.role !== "admin")) {
      navigate("NotAuthorized", { replace: true });
    }
  }, [user]);
  return (
    <Fragment>
      <HeaderDashBoard />
      <Outlet />
    </Fragment>
  );
};
