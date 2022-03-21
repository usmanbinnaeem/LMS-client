import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);
  return (
    <>
    <center>
      <h1 className="pt-2.5">Become Instructor</h1>
      <GroupAddOutlinedIcon  style={{ fontSize: 150 }} />
      <h2>Setup payout to publish courses on LMS</h2>
      <p className="text-yellow-400">LMS partners with stripe to transfer earnings to your Bank Account</p>
      <Button>Show Button</Button>
      <p>
          You will be redirected to stripe to complete Onboarding Process
      </p>
      </center>
    </>
  );
};

export default BecomeInstructor;
