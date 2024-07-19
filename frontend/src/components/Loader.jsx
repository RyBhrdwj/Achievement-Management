import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <CircularProgress />
        <p className="ml-2 text-lg">Loading data...</p>
      </div>
  )
}

export default Loader
