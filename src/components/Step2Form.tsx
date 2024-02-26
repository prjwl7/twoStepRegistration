// Step2Form.tsx
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Autocomplete } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStep2Data } from "../features/actions.ts";
import { addSubmittedUser } from "../features/actions.ts";
interface Step2FormData {
  Address?: string;
  State?: string;
  City?: string;
  Country?: string;
  Pincode?: string;
}

const Step2Form: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm<Step2FormData>();
  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch country options from the API
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country: any) => country.name.common);
        setCountryOptions(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit: SubmitHandler<Step2FormData> = (data) => {
    dispatch(setStep2Data(data));
    // Additional logic or navigation if needed
  };

  // Watch the "Country" field and set its value in the form state
  const selectedCountry = watch("Country");
  useEffect(() => {
    setValue("Country", selectedCountry);
  }, [selectedCountry, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("Address")} label="Address" />
      <TextField {...register("State")} label="State" />
      <TextField {...register("City")} label="City" />
      <Autocomplete
        {...register("Country")}
        options={countryOptions}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <TextField
        {...register("Pincode")}
        label="Pincode"
        inputProps={{ pattern: "[0-9]*" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Step2Form;
