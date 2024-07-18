import React from "react";
import axios from "axios";

const DownloadButton = ({ mentor }) => {
  const fetchCSV = async () => {
    let response;
    try {
      if (mentor) {
        response = await axios.get(
          "/achievement/6692351e76002fc8b2ab2b35/accepted/csv"
        );
      }
      else {
        response = await axios.get(
            "/achievement/6692353576002fc8b2ab2b37/csv"
          );
      }
      console.log(response.data);
      if (response.status === 200) {
        const csvUrl = response.data.fileUrl;
        downloadCSV(csvUrl); // Trigger download
      } else {
        console.error("Error fetching CSV:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching CSV:", error);
    }
  };

  const downloadCSV = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Open in a new tab
    link.download = mentor ? "student_achievements.csv" : "achievements.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={fetchCSV}
      className="bg-green-600 text-white py-2 px-4 rounded-md shadow m-4"
    >
      Download Achievements CSV
    </button>
  );
};

export default DownloadButton;
