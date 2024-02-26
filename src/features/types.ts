import * as yup from "yup";


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: {
      state: string;
      city: string;
      country: string;
      postalCode?: string;
    };
  }
  
  // Step 1 Form Validation Schema
  const step1Schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  
  // Step 2 Form Validation Schema
  const step2Schema = yup.object().shape({
    password: yup.string().required("Password is required").min(6, "Password is too short"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    address: yup.object().shape({
      state: yup.string().required("State is required"),
      city: yup.string().required("City is required"),
      country: yup.string().required("Country is required"),
      postalCode: yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(6, "Must be exactly 6 digits")
    }),
  });