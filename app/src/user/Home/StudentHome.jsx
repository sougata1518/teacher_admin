import Navbar from "./Navbar";
import StudentRoutes from "../routes/student_routes";
import { Outlet } from "react-router-dom";

export default function StudentHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}