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
});

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
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
        email: "",
        newPassword: "",
        code: "",
      }}
      validationSchema={schema}
      onSubmit={
        success
          ? async (values, actions) => {
              try {
                setLoading(true);
                const { data } = await axios.post(`/api/reset-password`, {
                  values,
                });
                actions.resetForm({
                  values: {
                    email: "",
                    newPassword: "",
                    code: "",
                  },
                });
                setLoading(false);
                toast.success(
                  "Password reset Successfully, continue to login with new password"
                );
                router.push('/login')
              } catch (err) {
                toast.error(err.response.data);
                setLoading(false);
              }
            }
          : async (values, actions) => {
              try {
                setLoading(true);
                const { data } = await axios.post(`/api/forgot-password`, {
                  values,
                });
                setSuccess(true);
                toast.success(
                  "Email Sent! Please check your email for 6 digit code"
                );
                setLoading(false);
              } catch (err) {
                toast.error(err.response.data);
                setLoading(false);
              }
            }
      }
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
            {success && (
              <>
                <div className="flex justify-center text-6xl p-3">
                  <Field
                    as={TextField}
                    fullWidth
                    type="text"
                    name="code"
                    id="code"
                    label="Code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    helperText={<ErrorMessage name="code" />}
                    variant="standard"
                    required
                  />
                </div>
                <div className="flex justify-center text-6xl p-3">
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    label="New Password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    helperText={<ErrorMessage name="newPassword" />}
                    variant="standard"
                    required
                  />
                </div>
              </>
            )}
            <div className="flex justify-center text-6xl p-3">
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ width: 350 }}
                disabled={!formik.values.email || loading}
              >
                {loading ? <CircularProgress /> : "Reset Password"}
              </Button>
            </div>
          </Box>
        </div>
      )}
    </Formik>
  );
};

export default ForgotPassword;
