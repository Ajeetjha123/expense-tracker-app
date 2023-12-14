import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Expenses = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Card.Body>
        <span>Welcome To Expense Tracker!!!</span>
        {
          <Button
            size="sm"
            className="float-end rounded-pill"
            variant="outline-secondary"
            onClick={() => navigate("/profile")}
          >
            <span>Your Profile Is Incomplete. </span>
            <span style={{ color: "blue" }}>Complete Now</span>
          </Button>
        }
      </Card.Body>
    </Card>
  );
};
