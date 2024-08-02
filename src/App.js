import React, { useState } from "react";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [array, setArray] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = {
      userId,
      collegeEmail,
      rollNumber,
      array: array.split(",").map(item => item.trim()),
    };

    try {
      const res = await fetch("https://bajajtest-backend.onrender.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setResponse(result); 
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const handleReset = () => {
    setUserId("");
    setCollegeEmail("");
    setRollNumber("");
    setArray("");
    setResponse(null);
    setError("");
  };

  return (
    <div className="App">
      <h1>Form in React</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userId">UserId*</label>
          <input
            type="text"
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="userId"
            required
          />

          <label htmlFor="email">College Email*</label>
          <input
            type="email"
            name="collegeemail"
            id="collegeemail"
            value={collegeEmail}
            onChange={(e) => setCollegeEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label htmlFor="RollNumber">Enter Roll Number*</label>
          <input
            type="text"
            name="RollNumber"
            id="RollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter roll no"
            required
          />

          <label htmlFor="Array">Array*</label>
          <input
            type="text"
            name="Array"
            id="Array"
            value={array}
            onChange={(e) => setArray(e.target.value)}
            placeholder="Enter Array (comma separated)"
            required
          />

          <button type="reset" value="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </fieldset>

      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
