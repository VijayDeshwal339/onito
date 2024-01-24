import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUser } from '../redux/slice/FormSlice';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Box,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.number().optional().positive().integer(),
});

const Step2Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: '',
    },
  });

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const options = response.data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountryOptions(options);
      })
      .catch((error) => {
        console.error('Error fetching country options:', error);
      });
  }, []);

  const onSubmit = (data) => {
   
    const user = JSON.parse(localStorage.getItem('step1'));
    const combinedData = { ...user, ...data };
    localStorage.setItem('step1', JSON.stringify(combinedData));
    dispatch(addUser(combinedData));
    
    navigate('/datatable');
    console.log(data);
  };

  return (
    <Box sx={{ marginInline: '20px', marginTop: '20px' }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: '600',
          marginBlock: '20px',
          textDecoration: 'underline',
        }}
      >
        Personal Details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* ---------------------------------------------first row--------------------------------------------- */}
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'none', md: 'center' }} spacing={4}>
            {/* ---------------------------------------------first input--------------------------------------------- */}
            <Stack direction={'row'} width={{ xs: '100%', md: '45%' }}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>Address</InputLabel>
              <Controller
                name="address"
                control={control}
                render={({ field }) => <TextField label="Address" {...field} fullWidth/>}
              />
            </Stack>

            {/* ---------------------------------------------Second input--------------------------------------------- */}
            <Stack direction={'row'} width={{ xs: '100%', md: '30%' }}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>State</InputLabel>
              <Controller
                name="state"
                control={control}
                render={({ field }) => <TextField label="State" {...field} fullWidth/>}
              />
            </Stack>

            {/* ---------------------------------------------third input--------------------------------------------- */}
            <Stack direction={'row'} width={{ xs: '100%', md: '25%' }}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>City</InputLabel>
              <Controller
                name="city"
                control={control}
                render={({ field }) => <TextField label="City" {...field} fullWidth/>}
              />
            </Stack>
          </Stack>

          {/* ------------------------------------------second row------------------------------------------- */}
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'none', md: 'center' }} spacing={{ xs: 4, md: 18 }}>
            {/* ---------------------------------------------fourth input--------------------------------------------- */}
            <Stack direction={'row'} width={{ xs: '100%', md: '35%' }}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>Country</InputLabel>
              <Controller
                name="country"
                control={control}
                
                render={({ field, fieldState }) => (
                  <>
                    <Select {...field} displayEmpty fullWidth> 
                      <MenuItem value="" disabled>
                        Select Country
                      </MenuItem>
                      {countryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error?.message && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </Stack>

            {/* ---------------------------------------------fifth input--------------------------------------------- */}
            <Stack direction={'row'} width={{ xs: '100%', md: '30%' }} spacing={4}>
              <InputLabel sx={{ width: "80px", paddingY: "20px" }}>Pincode</InputLabel>
              <Controller
                name="pincode"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                    fullWidth
                      label="Pincode"
                      type="number"
                      {...field}
                      error={fieldState.error?.message ? true : false}
                      helperText={fieldState.error?.message}
                    />
                    {fieldState.error?.message && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </>
                )}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button variant='contained' type="submit" sx={{marginBlock:'20px'}}>Submit</Button>
      </form>
    </Box>
  );
};

export default Step2Form;
