import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  // router
  const router = useRouter();

  useEffect(() => {
    fetchuser();
  }, []);
  const fetchuser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
      // console.log("current user data", data);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };
  return (
    <>
      {!ok ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="success" />
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute;
