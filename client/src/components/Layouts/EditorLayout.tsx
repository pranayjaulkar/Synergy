import { Outlet } from "react-router";
import MenuBar from "../Editor/MenuBar";

export default function EditorLayout() {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
}
