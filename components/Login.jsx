import { Formik, Field, ErrorMessage } from "formik";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .min(8, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  
  // router
  const router = useRouter();

  useEffect(() => {
    if(user !== null){
      router.push("/user/dashboard")
    }
  },[user])
  // console.log("State", state);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        try {
          setLoading(true);
          const { data } = await axios.post(`/api/login`, {
            values,
          });
          // console.log("login response data", data);
          //   toast.success("Registeration Successfull, Please Login");
          dispatch({
            type: "LOGIN",
            payload: data,
          });
          // save in local storage
          window.localStorage.setItem("user", JSON.stringify(data));
          actions.resetForm({
            values: {
              email: "",
              password: "",
            },
          });

          // redirect
          router.push("/user/dashboard");
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
                  !formik.values.email || !formik.values.password || loading
                }
              >
                {loading ? <CircularProgress /> : "Login"}
              </Button>
            </div>
          </Box>
          <p className="text-center p-3">
            Don't have Account?{" "}
            <Link href={"/register"}>
              <a className="text-blue-500">Please Register First</a>
            </Link>
          </p>
          <p className="text-center p-3">
            Do You Forgot Password?{" "}
            <Link href={"/forgot-password"}>
              <a className="text-red-500">Reset Here</a>
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
};

export default Login;