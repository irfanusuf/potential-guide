import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { axiosInstance } from "./App"; // Ensure you have this instance configured
import IsAuthorised from "./IsAuthorised";

const UserProfile = () => {

 IsAuthorised()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const {data} = await axiosInstance.get("/users/all"); // Adjust endpoint as needed
        console.log(data.payload)
        setUsers(data.payload); // Ensure backend returns an array of user objects
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography color="primary" variant="h5" textAlign= "center" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        User Database
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography textAlign="center" color="error">{error}</Typography>
      ) : (

      <Container>
        <Typography color="secondary" variant="h6"  sx={{ fontWeight: "semi-bold", marginBottom: 2 }}>
        Admin info  :   <Typography fontStyle="italic" sx={{color : "grey"}}> {localStorage.getItem("loginInfo")}</Typography> 
         </Typography>


        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Password</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
      )}
    </Container>
  );
};

export default UserProfile;
