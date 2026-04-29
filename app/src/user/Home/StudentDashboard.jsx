import React from "react";
import Banner from "./Banner";
import RecommendedCourses from "./RecomendedCourse";
import Footer from "./Footer";

const StudentDashboard = () => {
    return(
        <>
            <Banner />
            <RecommendedCourses />
            <Footer />
        </>
    )
}

export default StudentDashboard;