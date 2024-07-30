import React from 'react'
import { MdUpload } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { RxCross1 } from "react-icons/rx";

const Form2 = ({ details, setDetails }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    const proofArray = files.map(file => ({
      file: file,
      url: URL.createObjectURL(file)
    }));

    setDetails({
      ...details,
      proofs: [...details.proofs, ...proofArray]
    });
  };

  const handleRemove = (index) => {
    const newProofs = details.proofs.filter((_, i) => i !== index);
    setDetails({
      ...details,
      proofs: newProofs
    });
  };

  return (
    <fieldset className="flex flex-col m-12 space-y-2">
      <label className="text-lg font-medium text-gray-700">
        Photos as proof:
      </label>
      <div className="relative flex flex-col items-center border-dashed border-2 border-gray-300 p-14 rounded-md space-y-4">
        <input
          className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
        {details.proofs.length > 0 && 
          details.proofs.map((proof, index) => (
            <div key={index} className='relative'>
              <img src={proof.url} alt="Avatar Preview" className="w-96" />
              <button title='delete' className='absolute top-0 right-0 p-2 m-2 bg-red-500 shadow rounded-full' onClick={() => handleRemove(index)}>
                <IconContext.Provider value={{ color: "white", size: "20px" }}>
                  <RxCross1 />
                </IconContext.Provider>
              </button>
            </div>
          ))
        }
          <button className="bg-blue-500 text-white px-4 py-2 text-lg rounded flex justify-center items-center gap-2 transition duration-150 ease-in-out hover:bg-blue-600">
            <IconContext.Provider value={{ color: "white", size: "25px" }}>
              <MdUpload />
            </IconContext.Provider>
            Browse
          </button>
      </div>
    </fieldset>
  )
}

export default Form2;
