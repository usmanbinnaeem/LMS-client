import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ReactMarkdown from "react-markdown";
import Dialog from "@mui/material/Dialog";
import AddLessons from "../../../../components/forms/AddLessons";
import Image from "next/image";
import { toast } from "react-toastify";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButton, setUploadButton] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  //Functions for Add lessons
  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButton(file.name);
      setUploading(true);
      const videoData = new FormData();
      videoData.append("video", file);

      //progressbar
      const { data } = await axios.post("/api/course/video-upload", videoData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      });
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Upload Failed");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  return (
    <InstructorRoute>
      <div>
        {course && (
          <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Image
              className="object-cover w-full h-64"
              src={course.image ? course.image.Location : "/course.png"}
              alt={course.name}
              width={672}
              height={300}
            />
            <div className="p-6">
              <div>
                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                  {course.category}&emsp;&emsp;&emsp;&emsp;&emsp;{" "}
                </span>{" "}
                <span className="text-xs font-medium text-yellow-400 uppercase dark:text-yellow-400">
                  {" "}
                  {course.lessons && course.lessons.length} Lessons
                  &emsp;&emsp;&emsp;&emsp;&emsp;{" "}
                </span>
                <span className="mx-1 text-xs ">
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add lesson's
                  </Button>
                  &emsp;&emsp;&emsp;&emsp;{" "}
                  <Dialog open={open} onClose={handleClose}>
                    <AddLessons
                      handleClose={handleClose}
                      values={values}
                      setValues={setValues}
                      handleAddLesson={handleAddLesson}
                      uploading={uploading}
                      setUploading={setUploading}
                      uploadButton={uploadButton}
                      setUploadButton={setUploadButton}
                      handleVideo={handleVideo}
                    />
                  </Dialog>
                </span>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  <Tooltip title="Edit" placement="top">
                    <Button color="warning">
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  &emsp;&emsp;&emsp;{" "}
                </span>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  <Tooltip title="Publish" placement="top">
                    <Button color="success">
                      <PublishIcon />
                    </Button>
                  </Tooltip>
                </span>
                <a
                  href="#"
                  className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white hover:text-gray-600 hover:underline"
                >
                  {course.name}
                </a>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <ReactMarkdown children={course.description} />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {/* <img
                      className="object-cover h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                      alt="Avatar"
                    /> */}
                    <a
                      href="#"
                      className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                    >
                      Jone Doe
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
