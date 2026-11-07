import { Outlet } from "react-router-dom";
import Sidebar from "../../common/Sidebar/Sidebar.tsx";

function DashboardLayout() {
    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard__content">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;