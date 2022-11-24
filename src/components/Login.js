import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, notification} from 'antd';
import axios from "axios"
import {backendUrl} from "../config/constants"

function Login(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = values => {
    const payload = {
      username: values.username,
      password: values.password,
    }
    setLoading(true);

    axios.post(backendUrl + "/admins/login", payload)
        .then(result => {
          notification.success({
            message: "Login successful.",
          })
          localStorage.setItem("token", result.data)
          props.setIsLogin(true)
          navigate("/admin-list")
        }).catch(error => {
      setLoading(false);
      notification.error({
        message: "Login failed.",
        description: error?.response?.data?.message || "Something went wrong."
      })
    })
  };

  return (
      <div className="signup-container">
        <h1>Login</h1>
        <div className="signup-content">
          <Form
              name="login"
              className="login-container"
              onFinish={onFinish}
          >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
              <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <br/>
              <br/>
              <Link to="/signup">
                <Button type="dashed" className="login-form-button">
                  Register
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
  );
};

export default Login;