import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import {  useNavigate } from "react-router-dom";
import { login } from "../../../services/authService"
import { setToken } from "../../../utils/getLocal"


const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit,  formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = async ({ email , password }) => {
    try {
      const { data } = await login(email , password);
      setToken(data.data.token);
      navigate('/dasgboard');
    } catch (ex) {
      if (ex.response && ex.response.status === 400 ) {
        // error here
      }
    }
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
