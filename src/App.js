import { useState } from "react";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Containers from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import { keys } from "@mui/system";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

function App() {
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");
  const [code, setCode] = useState("");
  const [program, setDigits] = useState("");

  const handleChange = (event) => {
    setCode(event.target.value);

    console.log("value is:", event.target.value);
  };
  const handleChange1 = (event) => {
    setDigits(event.target.value);

    console.log("value is:", event.target.value);
  };
  const handleChange2 = (event) => {
    // setMyF(event.target.value);
    if (event.target.files.length) {
      const inputFile = event.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
      console.log("value is:", event.target.value);
    }
  };
  const handleSubmit = (event) => {
    setCode(event.target.value);
    setDigits(event.target.value);
    // If user clicks the parse button without
    // a file we show a error

    if (!program) {
      alert("please fill in the year and program field");
    }
    if (!code) {
      alert("please fill in the departmental code ");
    }
    if (!file) {
      setError("Enter a valid file");
      alert("enter a csv file");
    }

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.values(parsedData);
      setData(columns);
      console.log(columns);
      // console.log(columns)
      const columns1 = Object.values(parsedData)[0];
      const columns2 = Object.values(parsedData)[1];
      console.log(columns1);
      console.log(columns2);
      let unNames = new Array();
      for (let value of columns) {
        let firstName = value.first_name;
        let lasttName = value.last_name;
        unNames.push(`${firstName} ${lasttName}`);
      }
      //sort method javascript?
      let matricNUM = new Object();
      // console.log(unNames)
      let here = unNames.forEach((element) => {
        let index1 = unNames.indexOf(element);

        unNames.sort();
        if (index1 < 9) {
          let stringindex = `${program}${code.toUpperCase()}00${index1 + 1}`;
          matricNUM[element] = stringindex;
        } else if (index1 > 9 && index1 < 99) {
          let stringindex = `${program}${code.toUpperCase()}0${index1 + 1}`;
          matricNUM[element] = stringindex;
        } else {
          let stringindex = `${program}${code.toUpperCase()}${index1 + 1}`;
          matricNUM[element] = stringindex;
        }
        console.log(matricNUM);

        //merge the data with CSV

        //object.keys in javascript?
      });
      var csv1 = "Name,\tProfession\n";
      let matn = Object.keys(matricNUM);
      matn.forEach((row) => {
        csv1 += `${row},${matricNUM[row]}`;
        csv1 += "\n";
      });

      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv1);
      hiddenElement.target = "_blank";
      hiddenElement.download = "GeneratedMatNo.csv";
      hiddenElement.click();
    };

    reader.readAsText(file);

    event.preventDefault();
  };

  return (
    <div>
      <Navbar bg="dark">
        <Containers>
          <Navbar.Brand className="navitem" href="#home">
            Matric number generator
          </Navbar.Brand>
        </Containers>
      </Navbar>
      <div className="in">
        <form onSubmit={handleSubmit}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>departmental code Eg:cybersecurity (CYS)</label>
              <input type="text" onChange={handleChange} value={code} />
            </div>
            <div className="new-expense__control">
              <label>year & program Eg:(U19)</label>
              <input type="text" onChange={handleChange1} value={program} />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input
                type="file"
                accept=".csv"
                name="file"
                onChange={handleChange2}
              />
            </div>
            <div className="new-expense__actions">
              <button type="submit">generate</button>
            </div>
          </div>
        </form>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          {/* <Typography variant="h2" component="h1" gutterBottom>
            matric No generator
          </Typography> */}
          <Typography variant="h5" component="h2" gutterBottom>
            {"please make sure the file inserted is in excel format"}
            {
              " also make sure the second column contains the name of the student"
            }
          </Typography>
          <Typography variant="body1">
            if not the site will carry go where u no know🤐🤐🤐
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              ©codeironside fury25423@gmail.com
            </Typography>
            {/* <Copyright /> */}
          </Container>
        </Box>
      </Box>
    </div>
  );
}
export default App;
