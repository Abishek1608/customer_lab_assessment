import React, { useState } from "react";
import "./App.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleAddSchema = () => {
    if (selectedValue) {
      const selectedOption = availableSchemas.find(
        (option) => option.value === selectedValue
      );
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(
        availableSchemas.filter((option) => option.value !== selectedValue)
      );
      setSelectedValue("");
    }
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label })),
    };
  
    try {
      const response = await fetch('https://webhook.site/1fecd403-2da1-4d05-9cb6-de13a335bb89', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Segment saved successfully');
      } else {
        alert('Failed to save segment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save segment');
    }
  };
  
  

  return (
    <div className="App">
      <div className="button">
        <button className="segment" onClick={() => setShowPopup(true)}>
          Save Segment
        </button>
      </div>

      <div className="custom_header">
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <div className="popup-topic">
                <h2>Saving Segment</h2>
              </div>
              <div>
                <div className="mt-4">
                  <label className="mb-3">Enter the Name of the Segment</label>
                  <br />
                  <input
                    type="text"
                    className="input-field"
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <p>To Save Your Segment you need to add the schema <br/>
                   to build the Query</p>
                </div>

                <div className="mt-4 blue-box mb-3  ">
                  {selectedSchemas.map((schema, index) => (
                    <div key={index}  >
                      <select
                        value={schema.value}
                        className="input-field"
                        onChange={(e) => handleAddSchema(e.target.value, index)}
                      >
                        <option  value={schema.value}>{schema.label}</option>
                      </select>
                      <button className="minus">-</button>
                    </div>
                  ))}
                </div>
              </div>
              <select
                value={selectedValue}
                className="mb-4 input-field1"
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="" disabled>
                  Select schema
                </option>
                {availableSchemas.map((schema, index) => (
                  <option key={index} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
              <button className="minus">-</button>
              <br/>
              <button onClick={handleAddSchema}>+Add new schema</button>
            </div>
            <div className="buttom3 ">
              <button onClick={handleSaveSegment} className="btn btn-success">
                Save the segment
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="btn btn-light text-danger"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
