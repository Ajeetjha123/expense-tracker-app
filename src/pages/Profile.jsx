import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

const Profile = () => {
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const nameInputRef = useRef();
  const urlInputRef = useRef();
  const handleUpdate = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2sHH1MU-g17pDj7gfb7pJJaQB9PZcsuU",
        {
          method: "POST",
          body: JSON.stringify({
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setUpdateSuccess(true);
      } else {
        setUpdateSuccess(false);
      }
    } catch (error) {
      setUpdateSuccess(false);
      console.error("Error updating profile:", error);
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <span>Winners never Quit, Quitters never win!!!</span>
          <Button
            size="sm"
            className="float-end rounded-pill"
            variant="outline-secondary"
          >
            <span>
              Your Profile Is 64% completed. A complete profile has a higher
              chance of landing a job.{" "}
            </span>
            <span style={{ color: "blue" }}>Complete Now</span>
          </Button>
        </Card.Body>
      </Card>
      <Form>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <h2 className="mb-0">Contact Details</h2>
          </Col>
          <Col className="ml-auto">
            <Button variant="outline-danger" className="float-end">
              Cancel
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <Form.Label htmlFor="inlineFormInput" className="mb-0">
              Full Name:
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Write Your Name"
              ref={nameInputRef}
            />
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" className="mb-0">
              Profile Photo URL:
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                id="inlineFormInputGroup"
                placeholder="Username"
                ref={urlInputRef}
              />
            </InputGroup>
          </Col>
          <Col>
            <Button variant="outline-info" onClick={handleUpdate}>
              Update
            </Button>{" "}
          </Col>
        </Row>
        {updateSuccess === true && (
          <p className="text-success mt-2">Profile updated successfully!</p>
        )}
        {updateSuccess === false && (
          <p className="text-danger mt-2">Failed to update profile.</p>
        )}
      </Form>
    </>
  );
};

export default Profile;
