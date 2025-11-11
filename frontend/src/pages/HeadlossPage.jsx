import { useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button, Table } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export default function HeadLossPage() {
  const [hazelForm, setHazelForm] = useState({ L: "", Q: "", D: "", C: "" });
  const [hazelResult, setHazelResult] = useState(null);

  const [darcyForm, setDarcyForm] = useState({ L: "", Q: "", D: "", f: "" });
  const [darcyResult, setDarcyResult] = useState(null);

  const handleHazelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/headloss", hazelForm);
      setHazelResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error calculating Hazen–Williams head loss");
    }
  };

  const handleDarcySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/darcy", darcyForm);
      setDarcyResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error calculating Darcy head loss");
    }
  };

  return (
   <div className="container-fluid mt-5">
  <h2>💧 Head Loss Calculators with Reference</h2>

  <div className="row mt-4">
    {/* Hazen Form */}
    <div className="col-lg-3 col-12">
      <h4>Hazen–Williams</h4>
      <Form onSubmit={handleHazelSubmit}>
        {["L", "Q", "D", "C"].map((field) => (
          <InputGroup className="mb-3" key={field}>
            <InputGroup.Text>{field}</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder={
                field === "L"
                  ? "Length (m)"
                  : field === "Q"
                  ? "Flow (L/s)"
                  : field === "D"
                  ? "Diameter (mm)"
                  : "C coefficient"
              }
              name={field}
              value={hazelForm[field]}
              onChange={(e) =>
                setHazelForm({ ...hazelForm, [e.target.name]: e.target.value })
              }
              required
            />
          </InputGroup>
        ))}
        <Button type="submit" variant="primary">
          Calculate
        </Button>
      </Form>
      {hazelResult && (
        <div className="mt-3 alert alert-info">{hazelResult.message}</div>
      )}
    </div>

    {/* Hazen Equation/Table */}
    <div className="col-lg-3 col-12">
      <h5>Equation:</h5>
      <p>
        <strong>Hazen–Williams:</strong> <br />
        <code>h<sub>f</sub> = 10.67 * L * Q^1.852 / (C^1.852 * D^4.87)</code>
      </p>
      <h5>Typical C values:</h5>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Pipe Material</th>
            <th>C Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Concrete</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Steel</td>
            <td>120</td>
          </tr>
          <tr>
            <td>PVC</td>
            <td>150</td>
          </tr>
        </tbody>
      </Table>
    </div>

    {/* Darcy Form */}
    <div className="col-lg-3 col-12">
      <h4>Darcy–Weisbach</h4>
      <Form onSubmit={handleDarcySubmit}>
        {["L", "Q", "D", "f"].map((field) => (
          <InputGroup className="mb-3" key={field}>
            <InputGroup.Text>{field}</InputGroup.Text>
            <Form.Control
              type="number"
              step="any"
              placeholder={
                field === "L"
                  ? "Length (m)"
                  : field === "Q"
                  ? "Flow (L/s)"
                  : field === "D"
                  ? "Diameter (mm)"
                  : "Friction factor (f)"
              }
              name={field}
              value={darcyForm[field]}
              onChange={(e) =>
                setDarcyForm({ ...darcyForm, [e.target.name]: e.target.value })
              }
              required
            />
          </InputGroup>
        ))}
        <Button type="submit" variant="success">
          Calculate
        </Button>
      </Form>
      {darcyResult && (
        <div className="mt-3 alert alert-info">
          <p>{darcyResult.message}</p>
          <p>Velocity: {darcyResult.details?.v} m/s</p>
        </div>
      )}
    </div>

    {/* Darcy Equation/Table */}
    <div className="col-lg-3 col-12">
      <h5>Equation:</h5>
      <p>
        <strong>Darcy–Weisbach:</strong> <br />
        <code>h<sub>f</sub> = f * (L/D) * (v^2 / 2g)</code> <br />
        <code>v = 4Q / (π D^2)</code>
      </p>
      <h5>Typical f values (smooth pipes):</h5>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Pipe Material</th>
            <th>f Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PVC</td>
            <td>0.019</td>
          </tr>
          <tr>
            <td>Steel</td>
            <td>0.020</td>
          </tr>
          <tr>
            <td>Concrete</td>
            <td>0.025</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
</div>

  );
}


