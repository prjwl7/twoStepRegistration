// Step1Form.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserField } from "../features/actions.ts";

interface Step1FormData {
  firstName: string;
  lastName: string;
  Name : string;
  email: string;
}

const step1Schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  Name : Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface Step1FormProps {
  goToNextStep: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ goToNextStep }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Step1FormData>({
    resolver: yupResolver(step1Schema),
  });

  const onSubmit = (data: Step1FormData) => {
    dispatch(setUserField(data)); // Dispatch action with user data

    // Call the function to navigate to Step2
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <TextField
        {...register("Name", {required:true})}
        label="Name"
        error={!!errors.Name}
        helperText={errors.Name?.message}
      />
      <TextField
        {...register("firstName", { required: true })}
        label="First Name"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        {...register("lastName", { required: true })}
        label="Last Name"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        {...register("email", { required: true })}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
};

export default Step1Form;
