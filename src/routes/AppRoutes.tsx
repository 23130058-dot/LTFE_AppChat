import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layouts/DasboardLayout/DashboardLayout.tsx";
import SettingsPage from "../pages/Settings/SettingsPage.tsx";

function GeneralApp() {
    return (
        <div>
            <h1>Welcome to Chat App</h1>
        </div>
    );
}

function AppRoutes() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<GeneralApp />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;