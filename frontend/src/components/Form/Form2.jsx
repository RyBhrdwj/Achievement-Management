import React from 'react'
import { MdUpload } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { RxCross1 } from "react-icons/rx";

const Form2 = ({details,setDetails}) => {
    const handleChange = (e) => {
        if (e.target.files[0]) {
          setDetails({
            ...details,
            proof: e.target.files[0],
            proofUrl: URL.createObjectURL(e.target.files[0]), 
          });
        }
      };
  return (
    <><fieldset className="flex flex-col m-12 space-y-2">
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
  </fieldset></>
  )
}

export default Form2
