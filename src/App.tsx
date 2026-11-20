import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DasboardLayout/DashboardLayout";
import GeneralApp from "./pages/GeneralApp";
import SettingsPage from "./pages/Settings/SettingsPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />

            {/* cac trang co Sidebar ben trai */}
            <Route element={<DashboardLayout />}>
                <Route path="/app" element={<GeneralApp />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}
export default App;