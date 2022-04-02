import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import ReactMarkdown from "react-markdown";
import AddLessons from "../../../../components/forms/AddLessons";
import Image from "next/image";
import { toast } from "react-toastify";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
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
  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setOpen(false);
      setUploadButton("Upload video");
      setCourse(data);
      toast.success("Lesson added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Lesson failed to add");
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButton(file.name);
      setUploading(true);
      const videoData = new FormData();
      videoData.append("video", file);

      //progressbar
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
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

  const handleVideoRemove = async () => {
    try {
      setUploading(false);
      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButton("Upload Video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Remove Failed");
    }
  };

  const listLessons = () => {
    return course?.lessons?.map((c, index) => {
      return (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary={c.title} />
          </ListItemButton>
        </ListItem>
      );
    });
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
                  {course.category}&emsp;&emsp;&emsp;{" "}
                </span>{" "}
                <span className="text-xs font-medium text-yellow-400 uppercase dark:text-yellow-400">
                  {" "}
                  {course.lessons && course.lessons.length} Lessons
                  &emsp;&emsp;&emsp;{" "}
                </span>
                <span className="mx-1 text-xs ">
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Add lesson's
                  </Button>
                  &emsp;&emsp;&emsp;{" "}
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
                      progress={progress}
                      handleVideoRemove={handleVideoRemove}
                    />
                  </Dialog>
                </span>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  <Tooltip title="Edit" placement="top">
                    <Button color="warning">
                      <EditIcon
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                      />
                    </Button>
                  </Tooltip>
                  &emsp;&emsp;{" "}
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
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {course && course.lessons && course.lessons.length} Lessons
              </h3>
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <List>{listLessons()}</List>
              </Box>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
