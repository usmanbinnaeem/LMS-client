import { Formik, Field, ErrorMessage } from "formik";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context";

const schema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 10 characters or less")
    .required("First Name Required"),
  lastName: Yup.string()
    .max(20, "Must be 10 characters or less")
    .required("Last name Required"),
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .min(8, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useContext(Context);
  const { user } = state;
  // router
  const router = useRouter();
  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        try {
          setLoading(true);
          const { data } = await axios.post(`/api/register`, {
            values,
          });
          // console.log("response data", data);
          toast.success("Registeration Successfull, Please Login");
          router.push('/login')
          actions.resetForm({
            values: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            },
          });
          setLoading(false);
        } catch (err) {
          toast.error(err.response.data);
          setLoading(false);
        }
      }}
    >
      {(formik) => (
        <div className="container mx-auto">
          <Box
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 "
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: 350 },
            }}
            noValidate
            // autoComplete="off"
          >
            <div className="flex justify-center text-6xl p-3">
              <Field
                as={TextField}
                fullWidth
                type="text"
                name="firstName"
                id="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                helperText={<ErrorMessage name="firstName" />}
                variant="standard"
                required
              />
            </div>
            <div className="flex justify-center text-6xl p-3">
              <Field
                as={TextField}
                fullWidth
                type="text"
                name="lastName"
                id="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                helperText={<ErrorMessage name="lastName" />}
                variant="standard"
                required
              />
            </div>
            <div className="flex justify-center text-6xl p-3">
              <Field
                as={TextField}
                fullWidth
                type="email"
                name="email"
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={<ErrorMessage name="email" />}
                variant="standard"
                required
              />
            </div>
            <div className="flex justify-center text-6xl p-3">
              <Field
                as={TextField}
                fullWidth
                type="password"
                name="password"
                id="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={<ErrorMessage name="password" />}
                variant="standard"
                required
              />
            </div>
            <div className="flex justify-center text-6xl p-3">
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ width: 350 }}
                disabled={
                  !formik.values.firstName ||
                  !formik.values.lastName ||
                  !formik.values.email ||
                  !formik.values.password ||
                  loading
                }
              >
                {loading ? <CircularProgress /> : "Submit"}
              </Button>
            </div>
          </Box>
          <p className="text-center p-3">
            Already Registered?{" "}
            <Link href={"/login"}>
              <a className="text-blue-500">Login</a>
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
};

export default Register;