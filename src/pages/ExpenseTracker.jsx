import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [expenses, setExpenses] = useState([]);
  const [, setEditingExpenseId] = useState(null);
  const [, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    if (expenseData.amount && expenseData.description) {
      saveExpenseToFirebase(expenseData);
      setExpenses((prevExpenses) => [...prevExpenses, expenseData]);

      setExpenseData({
        amount: "",
        description: "",
        category: "Food",
      });
    }
  };
  const saveExpenseToFirebase = async (expenseData) => {
    const apiUrl =
      "https://fir-course-cbbca-default-rtdb.firebaseio.com/expense.json";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data added to Firebase successfully:", data);
    } catch (error) {
      console.error("Error adding data to Firebase:", error);
    }
  };
  const handleDeleteExpense = async (id) => {
    const apiUrl = `https://fir-course-cbbca-default-rtdb.firebaseio.com/expense/${id}.json`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      console.log("Expense successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setExpenseData({ ...expenseToEdit });
      setEditingExpenseId(id);
      setShowModal(true);
    }
  };
  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    const fetchData = async () => {
      const apiUrl =
        "https://fir-course-cbbca-default-rtdb.firebaseio.com/expense.json";

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data) {
          // Convert the Firebase response object into an array
          const expensesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setExpenses(expensesArray);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);
  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

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
                  <div>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditExpense(expense.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {totalExpenses > 10000 && (
            <div className="mt-4 text-center">
              <Button variant="warning" className="rounded-pill">
                Activate Premium
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
