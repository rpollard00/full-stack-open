import { Button, Container, Divider } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { setPatientList, useStateValue } from "./state";
import { Patient } from "./types";

import { Typography } from "@material-ui/core";
import PatientInfoPage from "./PatientInfoPage";
import PatientListPage from "./PatientListPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  // const match: PathMatch<"id"> | null = useMatch('/patients/:id');
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const patientMatch: Patient | undefined = match
  //   ? Object.values(patients).find((p: Patient) => p.id === match.params.id)
  //   : undefined;


  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientInfoPage />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
