import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue
}) => {
  return (
    <Box m="30px auto" >
      <Box>
        <Typography sx={{mb:"15px"}} fontSize="30px" fontWeight="bold" fontFamily="Roboto" textAlign="center">
            BILLING INFORMATION
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors = {errors}
          touched = {touched}
          handleBlur = {handleBlur}
          handleChange = {handleChange}
        />
      </Box>

      <Box mb="20px">
         <FormControlLabel 
           label="Same For Shipping Address"
           control={
            <Checkbox
               defaultChecked
               value={values.shippingAddress.isSameAddress}
               onChange={()=>
                 setFieldValue(
                    "shippingAddress.isSameAddress",
                    !values.shippingAddress.isSameAddress
                 )
               }
            />
           }
         />
      </Box>

      {!values.shippingAddress.isSameAddress && (
        <Box>
        <Typography sx={{mb:"15px"}} fontSize="30px" fontWeight="bold" fontFamily="Roboto" textAlign="center">
          SHIPPING INFORMATION
        </Typography>
        <AddressForm
          type="shippingAddress"
          values={values.shippingAddress}
          errors = {errors}
          touched = {touched}
          handleBlur = {handleBlur}
          handleChange = {handleChange}
        />
        </Box>
        )}
    </Box>
  )
}

export default Shipping