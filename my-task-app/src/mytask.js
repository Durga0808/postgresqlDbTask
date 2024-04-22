import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme

// Create new GridExample component
export const GridExample = () => {
  const [data, setData] = useState([]);
  const [dataFromDB, setDataFromDB] = useState([]);
  const [keys, setKeys] = useState([]); // State to hold the keys

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        const fetchedData = response.data;
        setData(fetchedData);
        setDataFromDB(fetchedData);

        // Extract keys from the first data item
        if (fetchedData.length > 0) {
          const firstItemKeys = Object.keys(fetchedData[0]);
          setKeys(firstItemKeys);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

//   const rowData = [
//     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//     { make: "Ford", model: "F-Series", price: 33850, electric: false },
//     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//   ];

    const rowData=data;
//   const colData = [
//     { headerName: "make", field: "make" },
//     { headerName: "model", field: "model" },
//     { headerName: "price", field: "price" },
//     { headerName: "electric", field: "electric"},
//   ];
const colData= keys.map(key => ({
    headerName: key,  // Use key as headerName
    field: key        // Use key as field
  }));

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colData}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};
