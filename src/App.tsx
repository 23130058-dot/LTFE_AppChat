import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import DashboardLayout from "./components/layouts/DasboardLayout/DashboardLayout";
import GeneralApp from "./pages/GeneralApp";
import FriendsPage from "./pages/Friends/FriendsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPassword from "./pages/auth/NewPassword";

function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />}/>
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>}/>
            <Route path="/auth/login" element={<AuthLayout><Login /></AuthLayout>}/>
            <Route path="/auth/register" element={<AuthLayout><Register /></AuthLayout>}/>
            <Route path="/auth/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>}/>
            <Route path="/auth/new-password" element={<AuthLayout><NewPassword /></AuthLayout>}/>
            <Route path="/reset-password" element={<AuthLayout><NewPassword /></AuthLayout>}/>

            {/* Các trang chính */}
            <Route element={<DashboardLayout />}>
                <Route path="/app" element={<GeneralApp />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/auth/login" replace />}
            />
        </Routes>
    );
}

export default App;
