import React, { useContext, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const nevigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const emailinputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = emailinputRef.current
      ? emailinputRef.current.value
      : "";
    const enteredPassword = passwordInputRef.current
      ? passwordInputRef.current.value
      : "";
    const enteredConfirmPassword = confirmPasswordInputRef.current
      ? confirmPasswordInputRef.current.value
      : "";
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    let url;

    if (isLogin) {
      //sign in
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        nevigate("/expense");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </Card.Title>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                style={{ backgroundColor: "#f8f9fa" }}
                ref={emailinputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#f8f9fa" }}
                ref={passwordInputRef}
                required
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "#f8f9fa" }}
                  ref={confirmPasswordInputRef}
                  required
                />
              </Form.Group>
            )}
            <Button
              variant="primary"
              className="rounded-pill w-100"
              type="submit"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer
          className="text-center"
          onClick={switchAuthModeHandler}
          style={{ cursor: "pointer", backgroundColor: "#BDECFF" }}
        >
          {isLogin ? "Don't have account? Sign Up" : "Have an account? Login"}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AuthForm;
