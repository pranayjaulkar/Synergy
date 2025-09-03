import { Outlet } from "react-router";
import Navbar from "../Navbar";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}
