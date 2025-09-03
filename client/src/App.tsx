import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MonacoEditor from "./components/MonacoEditor";
import ThemeProvider from "./providers/ThemeProvider";
import { useEffect } from "react";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./components/Layouts/HomeLayout";
import AuthLayout from "./components/Layouts/AuthLayout";
import EditorLayout from "./components/Layouts/EditorLayout";

function App() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => {
      console.log("Connection Opened");
    };

    return () => ws.close();
  }, []);
  return (
    <ThemeProvider>
      <Toaster />
      <div className="w-full min-h-screen dark:bg-zinc-950">
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
            </Route>
            <Route element={<EditorLayout />}>
              <Route path="/editor" element={<MonacoEditor />}>
                <Route path=":fileId" element={<MonacoEditor />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
