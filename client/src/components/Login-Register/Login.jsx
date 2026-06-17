import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";

function Login() {
  return (
    <div>
      {/* <Button>button</Button> */}
      {/* <PrimaryButton>accept</PrimaryButton> */}
      <Button variant="primary">primary</Button>
      <Button variant="green">green</Button>
      <Button variant="custom">custom</Button>
      Login Page
      <Link to="home">
        <h1>To home Page</h1>
      </Link>
    </div>
  );
}

export default Login;
