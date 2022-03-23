import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CircularProgress from "@mui/material/CircularProgress";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. try again");
        setLoading(false);
      });
  };
  return (
    <center>
      <div className="border-solid border-2 border-indigo-600 ml-72 m-72 mt-16 p-16">
        <h1 className="text-center pt-2.5">Become Instructor</h1>
        <GroupAddOutlinedIcon style={{ fontSize: 150 }} />
        <h2 className="text-center pb-2">
          Setup payout to publish courses on LMS
        </h2>
        <p className="text-center text-yellow-400 pb-2">
          LMS partners with stripe to transfer earnings to your Bank Account
        </p>
        <Button
          variant="outlined"
          className="m-16"
          onClick={becomeInstructor}
          disabled={
            (user && user.role && user.role.includes("Instructor")) || loading
          }
        >
          {loading ? <CircularProgress /> : "Payout Setup"}
        </Button>
        <p className="text-center pt-2">
          You will be redirected to stripe to complete onboarding Process
        </p>
      </div>
    </center>
  );
};

export default BecomeInstructor;
