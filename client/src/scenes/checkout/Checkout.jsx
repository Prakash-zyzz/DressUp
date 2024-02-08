import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import Shipping from "./Shipping"
import { shades } from '../../theme';
import { Box, Button, Stepper, Step, StepLabel} from "@mui/material";
import { Formik } from 'formik';
import Payment from './Payment';
import * as yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import Money from './Money';
import { ThemeProvider, createTheme } from '@mui/material/styles';





const iconSize = '3rem'; // Adjust the desired size for icons
const labelSize = '3rem'; // Adjust the desired size for labels

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '10rem',
          fontFamily:"Roboto",
          fontWeight:"bold",
          iconSize:"20px",
        },
      },
    },
  },
});


const stripePromise = loadStripe(
  "pk_test_51O0ovqSD3BteUM8twduuT7XoK2UQbOXs1aXYmtRnWPkNePiGWGGqTlWeVxE0puiBQeYDF44dz1p6KlAnwiKDbWmh00Mz1OpwbQ"
)
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#808080',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 6,
    borderRadius: 8,
  },
}));

const steps = ['BILLING', 'PAYMENT'];

const iconStyles = {
  fontSize: '3rem', // Increased font size for icons
};

const labelStyles = {
  fontSize: '3rem', // Increased font size for step labels
};



function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <div>
      {completed ? (
        <Check className={className} style={iconStyles} />
      ) : (
        <div className={className} style={iconStyles} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const initialValues = {
  billingAddress: {
     firstName:"",
     lastName:"",
     country:"",
     street1:"",
     street2:"",
     city:"",
     state:"",
     zipCode:"",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName:"",
    lastName:"",
    country:"",
    street1:"",
    street2:"",
    city:"",
    state:"",
    zipCode:"",
 },
 email:"",
 phoneNumber:"" 
}

const checkoutSchema =[
  yup.object().shape({
    billingAddress: yup.object().shape({
     firstName: yup.string().required("required"),
     lastName:yup.string().required("required"),
     country:yup.string().required("required"),
     street1:yup.string().required("required"),
     street2:yup.string(),
     city:yup.string().required("required"),
     state:yup.string().required("required"),
     zipCode:yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("shippingAddress.isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
     }),
  }),
  yup.object().shape({
    email:yup.string().required("required"),
    phoneNumber:yup.string().required("required"),
  })
]


const Checkout = () => {
  
  const [activeStep,setActiveStep] = useState(0);
  const cart = useSelector((state)=>state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isThirdStep = activeStep === 2;

  const  handleFormSubmit = async (values,actions)=>{
    setActiveStep(activeStep + 1);

    if(isFirstStep && values.shippingAddress.isSameAddress){
      actions.setFieldValue("shippingAddress",{
         ...values.billingAddress,
         isSameAddress: true,
        })
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

 
  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    
    <Box width="80%" m="100px auto">
       <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label} >
            <ThemeProvider theme={theme}>
            <StepLabel
              StepIconComponent={index === 0 ? ReceiptTwoToneIcon : AttachMoneyTwoToneIcon }
              sx={{labelSize}}
            >
              {label}
            </StepLabel>
            </ThemeProvider>
          </Step>
        ))}
      </Stepper>
    </Stack>

    
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema[activeStep]}
      >
         {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
         }) => 
           <form onSubmit={handleSubmit}>
                {isFirstStep && (
                  <Shipping
                    values = { values}
                    errors = {errors}
                    touched = {touched}
                    handleBlur = {handleBlur}
                    handleChange = {handleChange}
                    setFieldValue = {setFieldValue}
                  />
                )}

                {isSecondStep && (
                  <Payment
                    values = { values}
                    errors = {errors}
                    touched = {touched}
                    handleBlur = {handleBlur}
                    handleChange = {handleChange}
                    setFieldValue = {setFieldValue}
                  />
                )}

               {isThirdStep && (
                  <Money
                    values = { values}
                    errors = {errors}
                    touched = {touched}
                    handleBlur = {handleBlur}
                    handleChange = {handleChange}
                    setFieldValue = {setFieldValue}
                  />
                )}

               

<Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: "15px",
                      padding: "15px 40px",isFirstStep
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: "15px",
                    padding: "15px 40px",
                  }}
                >
                  {isFirstStep && isThirdStep ? "Next" : "Place Order"}
                  
                </Button>
              </Box>
              
                 
              
           </form>
         }
      </Formik>
    </Box>
    
  )
}

export default Checkout