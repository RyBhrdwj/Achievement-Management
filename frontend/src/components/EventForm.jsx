import React, { useState } from 'react';
import { Container, Button, ProgressBar, Alert, Form } from 'react-bootstrap';
import Form1 from './Form/Form1';
import Form2 from './Form/Form2';
import Review from './Form/Review';
import axios from 'axios';

const steps = ['Add Details', 'Add Proof'];

export default function EventForm({ setSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
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
    if (mode === 'offline') {
      return (
        name === "" ||
        date === "" ||
        type === "" ||
        result === ""
      );
    } else {
      return (
        name === "" ||
        date === "" ||
        type === "" ||
        mode === "" ||
        result === "" ||
        location === ""
      );
    }
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      const userId = '60c72b2f9b1d8b001f8e4c23';
      const { name, date, type, otherType, mode, result, location } = details;
      const description = type === 'other' ? otherType : type;

      const response = await axios.post('https://amgmt.onrender.com/api/add-achievement', {
        userId, name, date, description, mode, location, result
      });

      const achievement = response.data._id;
      const mentor = '12345';

      await axios.post('https://amgmt.onrender.com/api/add-request', {
        user: userId, achievement, mentor
      });

    } catch (error) {
      console.error(error);
    }

    setSubmit(true);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form1 details={details} setDetails={setDetails} />;
      case 1:
        return <Form2 details={details} setDetails={setDetails} />;
      default:
        return <Review details={details} />;
    }
  };

  const handleModeChange = (mode) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      mode,
      location: mode !== 'online' ? '' : prevDetails.location  // Clear location if mode is not online
    }));
  };

  return (
    <Container className="mt-5">
      <ProgressBar now={(activeStep / steps.length) * 100} className="mb-4" />

      {activeStep === steps.length ? (
        <div>
          <Alert variant="success">All steps completed!</Alert>
          <Review details={details} />
          <div className="d-flex justify-content-end mt-3">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h2>{steps[activeStep]}</h2>
            <p>Step {activeStep + 1} of {steps.length}</p>
          </div>
          {renderStepContent(activeStep)}
          
    

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isDisabled()}
              variant={activeStep === steps.length - 1 ? 'success' : 'primary'}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}



