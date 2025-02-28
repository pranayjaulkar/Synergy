import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MonacoEditor from "./components/MonacoEditor";
import ThemeProvider from "./providers/ThemeProvider";
import { useEffect } from "react";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";

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
            <Route index element={<Home />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="leaves" element={<Navigate to="/" />}>
              <Route path=":leafId" element={<MonacoEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
