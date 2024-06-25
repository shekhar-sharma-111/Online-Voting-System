import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AdminLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../../Component/Context/Context";
import { useNavigate } from "react-router-dom";
import Admin from "../Admin/Admin";
const AdminLogin = () => {
  const { adminLoggedin, setAdminLoggedin } = useContext(Context);
  const { adminData, setAdminData } = useContext(Context);
  const navigate = useNavigate();
  if (!adminLoggedin || !adminData) {
    localStorage.setItem("admindata", null);
    localStorage.setItem("adminlogin", false);
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <div className="login">
        <div className="form">
          <h1 className="text-center mb-5">Admin Login</h1>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              // Handle form submission here
              await fetch("http://localhost:5500/admin/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status == 200) {
                    actions.setSubmitting(false);
                    console.log(data.data.email);
                    setAdminLoggedin(true);
                    setAdminData(values.email);
                    navigate("/admin");

                    localStorage.setItem("adminlogin", true);
                    localStorage.setItem("admindata", values.email);

                    setTimeout(() => {
                      alert(`welcome ${data.data.name}`);
                    }, 3000);
                    console.table(data);
                  } else {
                    alert("Invalid Credentials");
                  }
                })
                .catch((err) => {
                  console.error(err);
                  // Handle error response here
                  actions.setSubmitting(false);
                  actions.setErrors({
                    general: "An error occurred while logging in.",
                  });
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Sign In
                </button>
                <br />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
