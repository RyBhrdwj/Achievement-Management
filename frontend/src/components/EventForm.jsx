import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MdUpload } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { RxCross1 } from "react-icons/rx";

const steps = ['Add Details', 'Add Proof'];

export default function EventForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
    const [details,setDetails] = useState({
        name: '',
        date: '',
        type: 'hackathon',
        otherType: '',
        mode: '',
        result: '',
        venue: '',
        proof: '',
        proofUrl: ''
    })

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setDetails({
        ...details,
        proof: e.target.files[0],
        proofUrl: URL.createObjectURL(e.target.files[0]), 
      });
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    console.log(details)

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
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
          <div>
            <h1>Review Details</h1>
            <h2>Name of the event: {details.name}</h2>
            <h2>Date: {details.date}</h2>
            <h2>Event Type: {details.type}</h2>
            <p>Mode: {details.mode}</p>
            <p>Result: {details.result}</p>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>           
          {activeStep === 0 && (<div className='grid gap-4'><div className="grid grid-cols-2 justify-between items-center space-x-4">
          <fieldset className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Event Name:
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={(e)=>setDetails({...details, name: e.target.value})}
              placeholder="Enter the name of the event"
              className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Event Date:
            </label>
            <input
              type="date"
              name="date"
              value={details.date}
              onChange={(e)=>setDetails({...details, date: e.target.value})}
              placeholder="Enter the date of the event"
              className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </fieldset>
          </div>
          <div className="grid grid-cols-2 justify-between items-center space-x-4">
          <fieldset className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Type of event:
            </label>
            <select
              className="py-2 px-4 bg-white border-2 border-gray-300 rounded-md"
              value={details.type}
              onChange={(e)=>setDetails({...details, type: e.target.value})}
            >
              <option value="hackathon">Hackathon</option>
              <option value="ideathon">Ideathon</option>
              <option value="seminar">Seminar</option>
              <option value="meetup">Meetup</option>
              <option value="other">Other</option>
            </select>
          </fieldset>
          <fieldset className="flex flex-col space-y-2">
            <label className={`text-lg font-medium ${details.type === 'other' ? 'text-gray-700' : 'text-gray-400'}`}>Other:</label>
            <input
              type="text"
              name="name"
              placeholder="In case of other please specify"
              className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
              disabled={details.type === 'other' ? false : true}
              onChange={(e)=>setDetails({...details, otherType: e.target.value})}
            />
          </fieldset>
        </div>
        <div className='grid grid-cols-3 gap-4'>
        <fieldset className="grid border-2 col-span-1 border-gray-300 p-4 rounded-lg">
            <legend className="text-lg font-medium text-gray-700">Mode:</legend>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="online"
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  onChange={(e)=>setDetails({...details, mode: e.target.value})}
                />
                <span className="text-lg">Online</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="offline"
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  onChange={(e)=>setDetails({...details, mode: e.target.value})}
                />
                <span className="text-lg">Offline</span>
              </label>
            </div>
            
          </fieldset>
          <fieldset className="grid border-2 col-span-2 border-gray-300 p-4 rounded-lg">
            <legend className="text-lg font-medium text-gray-700">Result:</legend>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="result"
                  value="won"
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  onChange={(e)=>setDetails({...details, result: e.target.value})}
                />
                <span className="text-lg">Won</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="result"
                  value="participated"
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  onChange={(e)=>setDetails({...details, result: e.target.value})}
                />
                <span className="text-lg">Participated</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="result"
                  value="runner-up"
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  onChange={(e)=>setDetails({...details, result: e.target.value})}
                />
                <span className="text-lg">Runner up</span>
              </label>
            </div>
            
          </fieldset>
          </div>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Event Venue:
          </label>
          <textarea
            name="venue"
            placeholder="Enter the venue of the event"
            className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            onChange={(e)=>setDetails({...details, venue: e.target.value})}
          />
        </fieldset></div>)}
        {activeStep === 1 && (<><fieldset className="flex flex-col m-12 space-y-2">
            <label className="text-lg font-medium text-gray-700">
              A photo as proof:
            </label>
            <div className="relative flex justify-center items-center border-dashed border-2 border-gray-300 p-14 rounded-md">
              <input
                className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={handleChange}
                />
                {details.proofUrl ? (<div className='relative'>
                  <img src={details.proofUrl} alt="Avatar Preview" className="w-96" />
                  <button title='delete' className='absolute top-0 right-0 p-2 m-2 bg-red-500 shadow rounded-full' onClick={()=>setDetails({...details, proof: null, proofUrl: ''})}> <IconContext.Provider value={{ color: "white", size: "20px" }}>
                  <RxCross1 />
                </IconContext.Provider> </button>
                  </div>
                ) :
                (
                    <button className="bg-blue-500 text-white px-4 py-2 text-lg rounded flex justify-center items-center gap-2 transition duration-150 ease-in-out hover:bg-blue-600">
                <IconContext.Provider value={{ color: "white", size: "25px" }}>
                  <MdUpload />
                </IconContext.Provider>
                Browse
              </button>
                )}
              
            </div>
          </fieldset></>)}
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

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
