/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useRoutes, useNavigate } from "react-router-dom";
import { themeAtom } from "../../../store";
import { useAtom } from "jotai";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
function SignIn() {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(themeAtom);
  const { register, handleSubmit,  formState: { errors }, setValue, } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = (val) => {
    axios.post('http://localhost:3002/api/auth/login', {
      "email": val.email,
      "password":val.password
    })
    .then(function (response) {
      setToken(JSON.stringify(response.data.data))
      navigate('/dashboard')
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
        <form onSubmit={handleSubmit(submitHandler)} id="hook-form">
      {/* <SoftBox component="form" role="form"> */}
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
    
          <SoftInput type="email" placeholder="Email" {...register("email")} error={errors?.email ? true : false} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" {...register("password")} error={errors?.password ? true : false}/>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth  type="submit">
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      {/* </SoftBox> */}
      </form>
    </CoverLayout>
  );
}

export default SignIn;
