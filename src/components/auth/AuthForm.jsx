import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailinputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = emailinputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (isLogin) {
      //sign in
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("signedUp successfully");
          } else {
            return res.json().then((data) => {
              console.log(data);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Sign Up</Card.Title>
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
            <Button
              variant="primary"
              className="rounded-pill w-100"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center" onClick={switchAuthModeHandler}>
          Have an account? {!isLogin ? "Login" : ""}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AuthForm;
