import React from "react";
import "../styles/Register.css";
import axios from "axios";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const submitFormHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log("error is ", error);
      message.error("User Already registered!")
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
          <h3 className="text-center">Registration form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="display-flex mx-auto">
            <Link to="/login" className="link mb-3">
              Already register ,login user
            </Link>
            <button type="submit" className="btn btn-primary mx-4">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
