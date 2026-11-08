import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layouts/DasboardLayout/DashboardLayout.tsx";

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
            </Route>
        </Routes>
    );
}

export default AppRoutes;