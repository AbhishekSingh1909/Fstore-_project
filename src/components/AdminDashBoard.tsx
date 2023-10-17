import { Fragment } from "react";
import { HeaderDashBoard } from "./DashBoardHeader";
import { Outlet } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <Fragment>
      <HeaderDashBoard />
      <Outlet />
    </Fragment>
  );
};
