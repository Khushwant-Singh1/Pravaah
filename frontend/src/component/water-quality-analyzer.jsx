import React, { useState } from 'react';
import Papa from 'papaparse';
import { Droplets, Zap, Leaf } from 'lucide-react';

const parameters = [
  { name: 'BOD', icon: <Leaf className="w-5 h-5" />, min: 0, max: 30, step: 0.1, unit: 'mg/L' },
  { name: 'Conductivity', icon: <Zap className="w-5 h-5" />, min: 0, max: 1000, step: 1, unit: 'μS/cm' },
  { name: 'Nitrate', icon: <Leaf className="w-5 h-5" />, min: 0, max: 50, step: 0.1, unit: 'mg/L' },
  { name: 'Total Coliform', icon: null, min: 0, max: 1000, step: 1, unit: 'MPN/100mL' },
  { name: 'Faecal Coliform', icon: null, min: 0, max: 500, step: 1, unit: 'MPN/100mL' },
  { name: 'Faecal Streptococci', icon: null, min: 0, max: 500, step: 1, unit: 'MPN/100mL' },
];

function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ id, type, min, max, step, value, onChange, className, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      placeholder={placeholder}
    />
  );
}


export default function WaterQualityAnalyzer() {
  const [values, setValues] = useState(() =>
    parameters.reduce((acc, param) => ({ ...acc, [param.name]: param.min }), {})
  );
  const [prediction, setPrediction] = useState(null);
  const [useCSV, setUseCSV] = useState(false); // State to toggle between CSV upload and form

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const csvData = result.data[0];
        const newValues = {};

        parameters.forEach((param) => {
          if (csvData[param.name]) {
            const value = parseFloat(csvData[param.name]);
            newValues[param.name] = isNaN(value) ? param.min : value;
          }
        });

        setValues((prev) => ({ ...prev, ...newValues }));
      },
    });
  };

  const handleInputChange = (name, value) => {
    const param = parameters.find((p) => p.name === name);
    if (!param) return;
    let newValue = Number(value);
    newValue = Math.max(param.min, Math.min(param.max, newValue));
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handlePredict = () => {
    const mockPrediction = (Math.random() * (12 - 1) + 1).toFixed(2);
    setPrediction(Number(mockPrediction));
  };

  const classifyOxygenLevel = (level) => {
    if (level >= 1 && level < 4) return { text: 'Low', color: 'text-red-500' };
    if (level >= 4 && level < 8) return { text: 'Normal', color: 'text-green-500' };
    if (level >= 8 && level <= 12) return { text: 'High', color: 'text-blue-500' };
    return { text: 'Unknown', color: 'text-gray-500' };
  };

  // Convert data to CSV format and download
  const handleDownloadCSV = () => {
    const csvData = [
      parameters.map((param) => param.name), // Header row
      parameters.map((param) => values[param.name]), // Data row
    ];
    const csvContent = Papa.unparse(csvData);

    // Create a link and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'water_quality_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bac flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg text-white p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Water Quality Analyzer</h2>
          <p className="text-white text-opacity-70">
            {useCSV ? 'Upload a CSV file to predict dissolved oxygen levels' : 'Enter water quality parameters manually'}
          </p>
        </div>

        {/* Toggle between CSV and Form */}
        <div className="mb-6">
          <Button onClick={() => setUseCSV(!useCSV)} className="w-full">
            {useCSV ? 'Switch to Manual Input' : 'Switch to CSV Upload'}
          </Button>
        </div>

        {useCSV ? (
          <div className="mb-6">
            {/* CSV Upload */}
            <label htmlFor="csvUpload" className="block text-sm font-medium mb-2">
              Upload CSV File
            </label>
            <input
              id="csvUpload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Manual Input Fields */}
            {parameters.map((param) => (
              <div key={param.name} className="space-y-1">
                <div className="flex items-center space-x-2">
                  {param.icon}
                  <label htmlFor={param.name} className="text-sm font-medium">
                    {param.name}
                  </label>
                </div>
                <Input
                  id={param.name}
                  type="number"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={values[param.name]}
                  onChange={(e) => handleInputChange(param.name, e.target.value)}
                  placeholder={`${param.min}-${param.max} ${param.unit}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center space-y-4">
          <Button onClick={handlePredict} className="w-full">
            Predict Dissolved Oxygen
            <Droplets className="ml-2 inline-block w-4 h-4" />
          </Button>

          {/* Add Download CSV Button */}
          {!useCSV && (
            <Button onClick={handleDownloadCSV} className="w-full">
              Download CSV
            </Button>
          )}

          {prediction !== null && (
            <div className="text-center">
              <p className="text-lg">Predicted Dissolved Oxygen:</p>
              <p className={`text-4xl font-bold ${classifyOxygenLevel(prediction).color}`}>
                {prediction} mg/L
              </p>
              <p className={`text-xl ${classifyOxygenLevel(prediction).color}`}>
                {classifyOxygenLevel(prediction).text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
