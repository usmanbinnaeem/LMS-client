import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

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
  return (
    <Formik
      initialValues={{
        firstName: "usman",
        lastName: "naeem",
        email: "example@gmail.com",
        password: "12345678",
      }}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        const { data } = await axios.post(
          `http://localhost:8000/api/register`,
          {
            values,
          }
        );
        console.log("response data", data);

        actions.resetForm({
          values: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          },
        });
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
            <div className="flex justify-center text-6xl p-6">
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
            <div className="flex justify-center text-6xl p-6">
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
            <div className="flex justify-center text-6xl p-6">
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
            <div className="flex justify-center text-6xl p-6">
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
            <div className="flex justify-center text-6xl p-6">
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ width: 350 }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
      )}
    </Formik>
  );
};

export default Register;
