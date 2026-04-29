import { Route, Routes } from "react-router-dom";
import StudentHome from "../Home/StudentHome";
import SearchResults from "../Home/SearchResults";
import StudentDashboard from "../Home/StudentDashboard";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="home/*" element={<StudentHome />}>
        <Route index element={<StudentDashboard />} />
        <Route path="search/course/:query/:page" element={<SearchResults />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;