import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import ChatViewer from './components/ChatViewer'

function App() {
  return (
      <Routes>
        {/* Layout will be applied to all these routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login/:provider" element={<Login />} />
          <Route path="callback" element={<AuthCallback />} />
        </Route>

        {/* Layout will not be applied to these routes */}
        <Route path="/chat/:fileDriveId" element={<ChatViewer />} />

      </Routes>
  );
}

export default App;
