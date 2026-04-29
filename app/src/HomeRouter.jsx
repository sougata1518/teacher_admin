import { useParams } from "react-router-dom";
import StudentHome from "./user/Home/StudentHome"
import Dashboard from "./admin/Home/dashboard";

import StudentRoutes from "./user/routes/student_routes";

export default function HomeRouter() {
  const { type } = useParams();

  if (type === "student") {
    return <StudentRoutes />;
  }

  if (type === "teacher") {
    return <Dashboard />;
  }

  return (
    <div className="p-6 text-red-500">
      Invalid user type: {type}
    </div>
  );
}