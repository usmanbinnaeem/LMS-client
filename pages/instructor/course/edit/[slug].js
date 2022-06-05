import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CreateCourse from "../../../../components/forms/CreateCourse";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const EditCoursePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    uploading: false,
    paid: false,
    loading: false,
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButton, setUploadButton] = useState("Upload Image");

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    setImage(data && data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButton(file.name);
    setValues({ ...values, loading: true });

    // resize image
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });

        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image Upload failed");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButton("Upload image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error("Image Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast.success("Course updated Successfully!");
      // router.push("/instructor");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    const movingItem = allLessons[movingItemIndex];
    allLessons.splice(movingItemIndex, 1);
    allLessons.splice(targetItemIndex, 0, movingItem);

    setValues({ ...values, lessons: [...allLessons] });

    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    toast.success("Lessons Rearranged Successfully!", data);
  };

  const listLessons = () => {
    return values?.lessons?.map((c, index) => {
      return (
        <ListItem key={index} disablePadding>
          <ListItemButton
            draggable
            onDragStart={(e) => handleDrag(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
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
      <h1 className="text-center">Update Course</h1>
      <div className="pt-12 pb-12">
        <CreateCourse
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButton={uploadButton}
          handleImageRemove={handleImageRemove}
          editPage={true}
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          {values && values.lessons && values.lessons.length} Lessons
        </h3>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <List onDragOver={(e) => e.preventDefault()}>{listLessons()}</List>
        </Box>
      </div>
    </InstructorRoute>
  );
};

export default EditCoursePage;
