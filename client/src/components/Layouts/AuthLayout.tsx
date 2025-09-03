import { Outlet } from "react-router";
import Navbar from "../Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar plain={true} />
      <Outlet />
    </>
  );
}
