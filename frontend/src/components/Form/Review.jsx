import React, {useState} from "react";

const Review = ({ details }) => {
    const [showProof, setShowProof] = useState(false);
    const handleShowProof = () => {
        setShowProof(!showProof);
      };
    
  return (
    <div>
      <h1 className="text-xl font-thin text-center mb-4">Review Details</h1>
      <table className="table-auto w-3/4 mx-auto border-collapse border border-gray-400">
        <tbody>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Name of the event:</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.name}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Date:</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.date}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Event Type:</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.type === 'other'? details.otherType : details.type}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Mode:</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.mode}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Venue(or link):</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.venue}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Result:</th>
            <td className="p-2 border border-gray-400 w-1/2">{details.result}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border border-gray-400 w-1/2">Proof:</th>
            <td className="p-2 border border-gray-400 w-1/2">
              {details.proofUrl ? (
                <>
                  <span>Submitted</span>
                  <button
                    onClick={handleShowProof}
                    className="ml-2 text-blue-500 underline"
                  >
                    {showProof ? "Hide Proof" : "Show Proof"}
                  </button>
                  {showProof && (
                    <div className="mt-2">
                      <img
                        src={details.proofUrl}
                        alt="Proof"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                </>
              ) : (
                <span>Not Submitted</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Review;
