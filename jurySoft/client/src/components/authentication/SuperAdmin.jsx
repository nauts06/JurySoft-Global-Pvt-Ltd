import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuperAdmin = (props) => {



  const navigate = useNavigate()



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required Required!"),
      password: Yup.string()
        .min(4, "Minimum 4 characters")
        .required(" Password is Required!"),
    }),
    onSubmit:async (values) => {
      console.log("values", values);

      const username = values.email;
      const password = values.password;
      const role = "superAdmin";

      try {
        await axios
          .post("http://localhost:5000/auth/login", {
            username,
            password,
            role,
          })
          .then((elem) => {
            navigate("/homepage");
            localStorage.setItem("role", role);

            localStorage.setItem("token", elem.data.token);
            // console.log("res",elem);
          });

        // setToken(response.data.token);
        // setMessage("Login successful!");
      } catch (error) {
        console.error("Loginerror", error);
        // setMessage("Login failed!");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Typography component="div" variant="h5" align="center">
          Welcome Super Admin
        </Typography>
        <div className="md:grid grid-cols-2 gap-2 ">
          <Grid sx={{ mt: 2 }}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              // type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid sx={{ mt: 2 }}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </div>
        <Grid sx={{ mt: 2 }}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
        <Grid>
          <Typography align="center">
           are you executive
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => navigate('/signIn')}
            >
              click here
            </Button>
          </Typography>
        </Grid>
      </form>
    </div>
  );
};

export default SuperAdmin;
