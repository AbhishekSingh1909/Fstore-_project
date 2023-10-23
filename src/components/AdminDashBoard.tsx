import { Fragment, useEffect } from "react";
import { HeaderDashBoard } from "./DashBoardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { NotAuthorized } from "../pages/NotAuthorizedUser";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { authenticateUserAsync } from "../redux/reducers/userAuthentication/authenticateUserAsync";

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  return (
    <Fragment>
      <HeaderDashBoard />
      <Outlet />
    </Fragment>
  );
};
