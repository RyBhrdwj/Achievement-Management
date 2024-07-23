import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = ({content}) => {
  return (
    <div className="flex justify-center items-center h-screen">
        <CircularProgress />
        <p className="ml-2 text-lg">{content}</p>
      </div>
  )
}

export default Loader
