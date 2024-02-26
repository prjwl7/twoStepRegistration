import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import { useDispatch } from "react-redux";
import { setUserField } from "../features/actions.ts"; // Import setUserField

const step2Schema = Yup.object().shape({
  password: Yup.string().required("Password is required").min(6, "Password is too short"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
  address: Yup.object().shape({
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(6, "Must be exactly 6 digits")
      .optional(),
  }),
});

const Step2Form: React.FC<{ countries: string[] }> = ({ countries }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(step2Schema), 
  });

  const { errors } = formState;

  const onSubmit = (data: Record<string, any>) => {
    dispatch(setUserField(data)); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("password")}
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register("confirmPassword")}
        label="Confirm Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <TextField
        {...register("address.state")}
        label="State"
        error={!!errors.address?.state}
        helperText={errors.address?.state?.message}
      />
      <TextField
        {...register("address.city")}
        label="City"
        error={!!errors.address?.city}
        helperText={errors.address?.city?.message}
      />
      <FormControl required error={!!errors.address?.country}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          {...register("address.country")}
          labelId="country-label"
          label="Country"
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
        {errors.address?.country?.message && (
          <span className="error">{errors.address.country.message}</span>
        )}
      </FormControl>
      <TextField
        {...register("address.postalCode")}
        label="Postal Code"
        error={!!errors.address?.postalCode}
        helperText={errors.address?.postalCode?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Step2Form;
