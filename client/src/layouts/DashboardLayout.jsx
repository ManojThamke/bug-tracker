import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout() {
    return(
        <div className="flex h-screen bg-[#F9EAF5] text-purple-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;