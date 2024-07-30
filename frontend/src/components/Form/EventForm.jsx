import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import Form1 from './Form1';
import Form2 from './Form2';
import Review from './Review';
import axios from 'axios';
import Loader from '../Loader';

const steps = ['Add Details', 'Add Proof'];

export default function EventForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [details, setDetails] = useState({
    name: '',
    date: '',
    type: '',
    description: '',
    otherDescription: '',
    mode: '',
    result: '',
    location: '',
    proofs: []  // Initialize proofs as an array
  });
  const [content, setContent] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled = () => {
    const { name, date, type, description, mode, result, location } = details;
    return (
      name === "" ||
      date === "" ||
      type === "" ||
      mode === "" ||
      result === "" ||
      location === "" ||
      description === ""
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
    setContent('Adding achievement...');
    setLoading(true);
    try {
      const userId = '6692353576002fc8b2ab2b37';
      const name = details.name;
      const date = details.date;
      const description = details.description === 'other' ? details.otherDescription : details.description;
      const location = details.location;
      const mode = details.mode;
      const result = details.result;
  
      const response = await axios.post('/add-achievement', {
        userId,
        name,
        date,
        is_Technical: details.type.toLowerCase() === 'technical',
        description,
        mode,
        location,
        result
      });
      
      const mentorId = '6692351e76002fc8b2ab2b35';
      
      if(details.proofs && details.proofs.length > 0) {
        const formData = new FormData();
        details.proofs.forEach((proof, index) => {
          formData.append('files', proof.file);
        });
        formData.append('userId', userId);
        formData.append('mentorId', mentorId);
        formData.append('achievementId', response.data.achievement._id);
        console.log(formData)
        setContent('Uploading Proof...');
        await axios.post('/upload-files', formData); // Endpoint to handle multiple files
      }
  
      const achievement = response.data.achievement._id;
      const mentor = '6692351e76002fc8b2ab2b35';
      setContent('Sending Request to Mentor...');
      const request = await axios.post('/add-request', {
        user: userId,
        achievement,
        mentor
      });
  
      setSnackbarMessage('Submission successful!');
      setSnackbarSeverity('success');
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Submission failed. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Loader content={content} />
    );
  }

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
