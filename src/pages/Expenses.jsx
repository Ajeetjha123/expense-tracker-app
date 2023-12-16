import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import ExpenseTracker from "./ExpenseTracker";
export const Expenses = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();
  const [verifictionSent, setVerificationSent] = useState(false);
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Verification email sent successfully:", responseData);
        setVerificationSent(true);
      } else {
        console.error("Error sending verification email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending verification email:", error.message);
    }
  };
  return (
    <Card>
      <Card.Body>
        <span>Welcome To Expense Tracker!!!</span>
        {isLoggedIn && (
          <Button
            size="sm"
            className="float-end rounded-pill"
            variant="outline-secondary"
            onClick={() => {
              authCtx.logout();
              navigate("/");
            }}
          >
            LogOut
          </Button>
        )}
        <Button
          size="sm"
          className="float-end rounded-pill"
          variant="outline-secondary"
          onClick={() => navigate("/profile")}
        >
          <span>Your Profile Is Incomplete. </span>
          <span style={{ color: "blue" }}>Complete Now</span>
        </Button>
        {!verifictionSent ? (
          <Button
            size="sm"
            className="float-end rounded-pill"
            variant="outline-secondary"
            onClick={() => sendVerificationEmail()}
          >
            Send Verification Email
          </Button>
        ) : (
          <p>Verification email sent! Check your inbox.</p>
        )}
      </Card.Body>
      <ExpenseTracker />
    </Card>
  );
};
