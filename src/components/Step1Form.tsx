import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button, Select, MenuItem, InputLabel, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setStep } from "../features/actions.ts";
import { useNavigate } from "react-router-dom";
import { addSubmittedUser } from "../features/actions.ts";
interface Step1FormData {
  Name: string;
  Age: string;
  Sex: string;
  Mobile: string;
  GovtIdType: string;
  GovtId: string;
}

const step1Schema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Age: Yup.string().required("Age is required"),
  Sex: Yup.string().required("Select your Sex"),
  Mobile: Yup.string().required("Enter Mobile number"),
  GovtIdType: Yup.string().required("Select ID type"),
  GovtId: Yup.string().required("This is required"),
});

interface Step1FormProps {
  goToNextStep: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ goToNextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Step1FormData>({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      Name: '',
      Age: '',
      Sex: 'male', 
      GovtIdType: 'aadhar', 
      Mobile: '',
      GovtId : '',
    },
  });

  const onSubmit = (data: Step1FormData) => {
    dispatch(addSubmittedUser(data));
    navigate("/step2");
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("Name", { required: true })}
            label="Name"
            error={!!errors.Name}
            helperText={errors.Name?.message}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("Age", { required: true })}
            label="Age"
            error={!!errors.Age}
            helperText={errors.Age?.message}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Select your Sex</InputLabel>
          <Select {...register("Sex", { required: true })} value="male">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("Mobile", { required: true })}
            label="Mobile"
            error={!!errors.Mobile}
            helperText={errors.Mobile?.message}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Select ID type</InputLabel>
          <Select {...register("GovtIdType", { required: true })} value="aadhar">
            <MenuItem value="aadhar">Aadhar</MenuItem>
            <MenuItem value="pan">PAN</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("GovtId", { required: true })}
            label="GovtId"
            error={!!errors.GovtId}
            helperText={errors.GovtId?.message}
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Step1Form;
