import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [expenses, setExpenses] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    if (expenseData.amount && expenseData.description) {
      setExpenses((prevExpenses) => [...prevExpenses, expenseData]);
      // Clear the form after adding the expense
      setExpenseData({
        amount: "",
        description: "",
        category: "Food",
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Card>
        <Card.Body>
          <h4>Add Daily Expenses</h4>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={expenseData.amount}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={expenseData.description}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={expenseData.category}
                  onChange={handleInputChange}
                >
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  {/* Add other categories as needed */}
                </Form.Control>
              </Col>
            </Row>
            <Button
              variant="primary"
              className="rounded-pill"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>
          </Form>

          <div className="mt-4">
            <h4 className="text-center fw-bold mb-3">Your Expenses</h4>
            <ul className="list-group">
              {expenses.map((expense, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="fw-bold">Amount:</span> {expense.amount}
                  </div>
                  <div>
                    <span className="fw-bold">Description:</span>{" "}
                    {expense.description}
                  </div>
                  <div>
                    <span className="fw-bold">Category:</span>{" "}
                    {expense.category}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
