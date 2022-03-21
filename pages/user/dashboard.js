import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
// import InstSideNav from "../../components/nav/InstructerSideNav";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1>
       User Dashboard
      </h1>
    </UserRoute>
  );
};

export default UserIndex;





















// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Box from "@mui/material/Box";
// import LinearProgress from "@mui/material/LinearProgress";
// // import InstSideNav from "../nav/InstructerSideNav";

// const UserRoute = ({ children }) => {
//   const [ok, setOk] = useState(false);

//   // router
//   const router = useRouter();

//   useEffect(() => {
//     fetchuser();
//   }, []);

//   const fetchuser = async () => {
//     try {
//       const { data } = await axios.get("/api/current-user");
//       if (data.ok) setOk(true);
//       // console.log("current user data", data);
//     } catch (err) {
//       console.log(err);
//       setOk(false);
//       router.push("/login");
//     }
//   };
//   return (
//     <>
//       {!ok ? (
//         <Box sx={{ width: "100%" }}>
//           <LinearProgress color="success" />
//         </Box>
//       ) : (
//         <div>{children}</div>
//       )}
//     </>
//   );
// };

// export default UserRoute;
