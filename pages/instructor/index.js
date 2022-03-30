import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";

const index = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  return (
    <InstructorRoute>
      <h1>Instructor Dashboard</h1>

      <pre>{JSON.stringify(courses, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default index;
