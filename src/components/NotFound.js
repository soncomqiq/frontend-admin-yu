import React from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export function NotFound(props) {
  const navigate = useNavigate();

  return (
      <div>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => navigate("/login")}>Back Home</Button>}
        />
      </div>
  )
}

export default NotFound;