import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // prevent refresh on submit
    e.preventDefault();

    try {
      // wait for response from registration
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      setValues({ email: "", password: "" });
    }
  };

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Sign up</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="test@gmail.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className="form-control"
            id="password"
            name="password"
            placeholder="password"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Register;
