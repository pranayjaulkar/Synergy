import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MonacoEditor from "./components/MonacoEditor";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen h-screen dark:bg-zinc-800">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="leaves" element={<Navigate to="/" />}>
              <Route path=":leafId" element={<MonacoEditor />} />
            </Route>
            {/* <Route path="workspaces" element={<WorkSpaces />}>
          <Route path=":workspaceId" element={<Workspace />}>
          <Route path="leaves" element={<Navigate to="/workspaces" />}>
          <Route path="leafId"></Route>
          </Route>
          </Route>
          </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
