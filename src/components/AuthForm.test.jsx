import { render } from "@testing-library/react";
import AuthForm from "./auth/AuthForm";
import { useNavigate } from "react-router-dom";

test("switches authentication mode", () => {
  const navigate = useNavigate();
  navigate("/expense");

  render(<AuthForm />);
  const switchButton = screen.getByText("Have an account? Login");
  fireEvent.click(switchButton);
  const signUpForm = screen.getByText("Sign Up");
  expect(signUpForm).toBeInTheDocument();
});
// Add appropriate mocks and dependencies
test("handles successful login submission", async () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ idToken: "mockToken" }),
    })
  );

  render(<AuthForm />);
  // Simulate user input
  // Submit the form
  fireEvent.submit(screen.getByRole("button", { name: "Login" }));

  // Wait for asynchronous tasks to complete
  await screen.findByText("Expense Tracker");

  // Check if navigation occurred
  expect(navigate).toHaveBeenCalledWith("/expense");
});
// Add appropriate mocks and dependencies
test("handles failed login submission", async () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({ error: { message: "Invalid credentials" } }),
    })
  );

  render(<AuthForm />);
  // Simulate user input
  // Submit the form
  fireEvent.submit(screen.getByRole("button", { name: "Login" }));

  // Wait for asynchronous tasks to complete
  await screen.findByText("Invalid credentials");

  // Check if alert is shown
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
});
// Add appropriate mocks and dependencies
test("handles successful sign-up submission", async () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ idToken: "mockToken" }),
    })
  );

  render(<AuthForm />);
  // Switch to sign-up mode
  fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

  // Simulate user input
  // Submit the form
  fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));

  // Wait for asynchronous tasks to complete
  await screen.findByText("Expense Tracker");

  // Check if navigation occurred
  expect(navigate).toHaveBeenCalledWith("/expense");
});
// Add appropriate mocks and dependencies
test("handles failed sign-up submission", async () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({ error: { message: "Email already exists" } }),
    })
  );

  render(<AuthForm />);
  // Switch to sign-up mode
  fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

  // Simulate user input
  // Submit the form
  fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));

  // Wait for asynchronous tasks to complete
  await screen.findByText("Email already exists");

  // Check if alert is shown
  expect(screen.getByText("Email already exists")).toBeInTheDocument();
});
test("renders forgot password link in login mode", () => {
  render(<AuthForm />);
  const forgotPasswordLink = screen.getByText("Forgot Password?");
  expect(forgotPasswordLink).toBeInTheDocument();
});
