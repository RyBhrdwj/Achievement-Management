import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Form1 from './Form/Form1';
import Form2 from './Form/Form2';
import Review from './Form/Review';
import axios from 'axios'

const steps = ['Add Details', 'Add Proof'];

export default function EventForm({setSubmit}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [details, setDetails] = useState({
    name: '',
    date: '',
    type: 'hackathon',
    otherType: '',
    mode: '',
    result: '',
    location: '',
    proof: '',
    proofUrl: ''
  });

    const isDisabled = () => {
      const { name, date, type, mode, result, location } = details;
      return (
        name === "" ||
        date === "" ||
        type === "" ||
        mode === "" ||
        result === "" ||
        location === ""
      );
    };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = async () => {
    console.log(details)
    try {
      // const formData = new FormData();
      // formData.append('userId','03520802722')
      // formData.append('name',details.name)
      // formData.append('date',details.date)
      // formData.append('description',details.type === 'other' ? details.otherType : details.type)
      // formData.append('location',details.location)
      // formData.append('mode',details.mode)
      // formData.append('result',details.result)
      // formData.append('proof', details.proof ? details.proof : null)
      // formData.append('verificationStatus','pending')
      // console.log(formData)
      const userId = '03520802722'
      const name = details.name
      const date = details.date
      const description = details.type === 'other' ? details.otherType : details.type
      const location = details.location
      const result = details.result
      const response = await axios.post('https://amgmt.onrender.com/api/add-achievement',{userId,name,date,description,location,result});
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    setSubmit(true)
  };

  return (
    <Box sx={{ width: '100%' }} className="p-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Review details={details} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>           
          {activeStep === 0 && (<Form1 details={details} setDetails={setDetails} />)}
        {activeStep === 1 && (<Form2 details={details} setDetails={setDetails} />)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} disabled={isDisabled()}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
