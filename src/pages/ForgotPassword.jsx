import React, { useContext, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const ForgotPassword = () => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const enterEmailInput = emailInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "",
          email: enterEmailInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        console.error("Password reset failed:", err.message);
        // Display the error to the user, e.g., set a state variable
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card>
        <Card.Body>
          <Card.Title>Forgot PassWord Page</Card.Title>
          <Form onSubmit={forgotPasswordHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Enter the email with which you have already registered.
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                ref={emailInputRef}
              />
            </Form.Group>
          </Form>
          <Button
            variant="success"
            className="rounded-pill w-100"
            type="submit"
          >
            Send Link
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
