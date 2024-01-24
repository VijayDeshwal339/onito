import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().required().min(3),
  age: yup.number().positive().integer().required(),
  sex: yup
    .string()
    .required("Please select a gender")
    .oneOf(["Male", "Female"], "Invalid gender"),
  mobile: yup
    .string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid Mobile Number")
    .required(),
  govtIdType: yup.string().required('').oneOf(["Aadhar", "PAN"]),
  govtId: yup.string().when("govtIdType", {
    is: "Aadhar",
    then: yup
      .string()
      .required()
      .matches(/^[2-9]\d{11}$/, "Invalid Aadhar Number"),
    otherwise: yup.string().when("govtIdType", {
      is: "PAN",
      then: yup
        .string()
        .required()
        .matches(/^[A-Za-z0-9]{10}$/, "PAN should be 10 characters long"),
      otherwise: yup.string().nullable(), // For other cases, no validation is needed
    }),
  }),
});

const Step1form = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('step1', JSON.stringify(data));
    navigate("/step2");
    console.log(data);
  };
  const singleLineLabel = {
    width: '80px',
    paddingY: '10px',
    display: 'flex',
    flexWrap: 'wrap', // Adjusted to allow text wrapping
  };

  return (
    <Box sx={{ marginInline: "20px", marginTop: "20px" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          marginBlock: "20px",
          textDecoration: "underline",
        }}
      >
        Personal Details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* ---------------------------------------------first row--------------------------------------------- */}
          <Stack direction={{xs:'column',md:"row"}} alignItems={{xs:'none',md:"center"}} spacing={4}>
            {/* ---------------------------------------------first input--------------------------------------------- */}
            <Stack direction={"row"} width={{xs:'100%',md:'45%'}} >
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>
                Name
              </InputLabel>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    {...field}
                    error={fieldState.error?.message ? true : false}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Stack>

            {/* ---------------------------------------------Second input--------------------------------------------- */}
            <Stack direction={"row"} width={{xs:'100%',md:'30%'}}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>
                Age
              </InputLabel>
              <Controller
                name="age"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="Age"
                    {...field}
                    error={fieldState.error?.message ? true : false}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Stack>

            {/* ---------------------------------------------third input--------------------------------------------- */}
            <Stack direction={"row"} width={{xs:'100%',md:'25%'}}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>
                Sex
              </InputLabel>
              <Controller
                name="sex"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormControl
                    error={fieldState.error?.message ? true : false}
                    fullWidth
                  >
                    <Select {...field} displayEmpty value={field.value || ""}>
                      {/* <MenuItem value="" disabled>Select</MenuItem> */}
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {fieldState.error?.message && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
          </Stack>

          {/* ------------------------------------------second row------------------------------------------- */}
          <Stack direction={{xs:'column',md:"row"}} alignItems={{xs:'none',md:"center"}} spacing={{xs:4,md:30}}>
            {/* ---------------------------------------------fourth input--------------------------------------------- */}
            <Stack direction={"row"} width={{xs:'100%',md:'35%'}}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>
                Mobile
              </InputLabel>
              <Controller
                name="mobile"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    label="Mobile"
                    {...field}
                    error={fieldState.error?.message ? true : false}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Stack>

            {/* ---------------------------------------------fifth input--------------------------------------------- */}
            <Stack direction={"row"} width={{xs:'100%',md:'65%'}} spacing={4}>
              
            <InputLabel sx={{ ...singleLineLabel }}>
                Govt <br></br> Issued Id
              </InputLabel>
   

              <Stack  direction={'row'} width='30%'>
              <Controller
                name="govtIdType"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    error={fieldState.error?.message ? true : false}
                   
                  >
                    <InputLabel> ID Type</InputLabel>
                    <Select {...field} displayEmpty value={field.value || ""}>
                      {/* <MenuItem value="" disabled>Select</MenuItem> */}
                      <MenuItem value="Aadhar">Aadhar</MenuItem>
                      <MenuItem value="PAN">PAN</MenuItem>
                    </Select>
                    {fieldState.error?.message && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
               </Stack>

               <Stack  width={'70%'}>
              <Controller
                name="govtId"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                  fullWidth
                  
                    label="Government ID"
                    {...field}
                    error={fieldState.error?.message ? true : false}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              </Stack>

            </Stack>
          </Stack>

         
        </Stack>

        <Button variant='contained' type="submit" sx={{marginBlock:'20px'}} >Next</Button>
      </form>
    </Box>
  );
};

export default Step1form;
