import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import Image from "next/image";
import Link from "next/link";

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

      {courses &&
        courses.map((course, index) => (
          <div
            key={index}
            className="flex justify-start items-start p-4  bg-blue-lightest"
          >
            <div
              id="app"
              className="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest"
            >
              <Image
                className="w-1/2 h-full rounded-l-sm"
                src={course.image ? course.image.Location : "/course.png"}
                alt="Room Image"
                width={500}
                height={350}
              />
              <div className="w-full flex flex-col">
                <div className="p-4 pb-0 flex-1">
                  <Link
                    href={`/instructor/course/view/${course.slug}`}
                    className="font-light mb-1 text-grey-darkest"
                  >
                    <a>{course.name}</a>
                  </Link>
                  <div className="text-xs flex items-center mb-4">
                    <i className="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                    {course.lessons.length} Lessons
                  </div>
                  <span className="text-5xl text-grey-darkest">
                    {course.lessons.length < 5 ? (
                      <span className="text-sm text-yellow-400">
                        {" "}
                        atleast 5 lessons required to publish a course
                      </span>
                    ) : course.published ? (
                      <span>Course Live</span>
                    ) : (
                      <span>Draft</span>
                    )}
                  </span>
                  <div className="flex items-center mt-4">
                    <div className="pr-2 text-xs">
                      <i className="fas fa-wifi text-green"></i> Delete
                    </div>
                    <div className="px-2 text-xs">
                      <i className="text-grey-darker far fa-building"></i> 2mins
                      to center
                    </div>
                  </div>
                </div>
                <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                  Book Now
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
    </InstructorRoute>
  );
};

export default index;
