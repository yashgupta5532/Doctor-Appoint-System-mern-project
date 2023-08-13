import React from "react";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitFormHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload()
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Logged in successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <>
      <div className="form-container container ">
        <Form
          layout="vertical"
          onFinish={submitFormHandler}
          className="register-form card p-3"
        >
          <h3 className="text-center">Login form</h3>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="display-flex mx-auto">
            <Link to="/register" className="link mb-3">
              Go to register page
            </Link>
            <button type="submit" className="btn btn-primary mx-4">
              Login
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
