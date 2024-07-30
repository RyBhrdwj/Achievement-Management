import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Review = ({ details }) => {
  const [showProofs, setShowProofs] = useState(false);
  const handleShowProofs = () => {
    setShowProofs(!showProofs);
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Review Details
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 800, mx: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Name of the event:
              </TableCell>
              <TableCell>{details.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Date:
              </TableCell>
              <TableCell>{details.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Event Type:
              </TableCell>
              <TableCell>
                {details.type === "other" ? details.otherType : details.type}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Mode:
              </TableCell>
              <TableCell>{details.mode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Organised By:
              </TableCell>
              <TableCell>{details.location}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Result:
              </TableCell>
              <TableCell>{details.result}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                Proofs:
              </TableCell>
              <TableCell>
                {details.proofs && details.proofs.length > 0 ? (
                  <>
                    <Typography component="span">Submitted</Typography>
                    <Button
                      onClick={handleShowProofs}
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ ml: 2 }}
                    >
                      {showProofs ? "Hide Proofs" : "Show Proofs"}
                    </Button>
                    {showProofs && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        {details.proofs.map((proof, index) => (
                          <Box
                            key={index}
                            sx={{
                              maxWidth: 300,
                              maxHeight: 300,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={proof.url}
                              alt={`Proof ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "100%",
                                maxHeight: "100%",
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  <Typography component="span">Not Submitted</Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Review;
