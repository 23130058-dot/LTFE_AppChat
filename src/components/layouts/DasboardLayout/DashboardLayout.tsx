import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

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