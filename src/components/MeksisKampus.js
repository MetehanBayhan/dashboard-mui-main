import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

function CampusBuildings() {
  const [campusData, setCampusData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchCampusData() {
      try {
        const response = await axios.get(
          'https://193.140.151.200:443/meksis/get_all_kampusler/1'
        );
        setCampusData(response);
        console.log('fetchCampusData:', typeof response.data.data);
      } catch (error) {
        console.error('Error fetching campus data:', error);
      }
    }

    fetchCampusData();
  }, []);

  const campusColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'adi', headerName: 'Kampus Adı', width: 150 },
    { field: 'adres', headerName: 'Adres', width: 150 },
    {
      field: 'action',
      headerName: 'Aksiyon',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCampusClick(params.row.id)}
        >
          Binaları Gör
        </Button>
      ),
    },
  ];

  const buildingColumns = [
    { field: 'ID', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Bina Adı', width: 150 },
  ];

  const handleCampusClick = async (campusId) => {
    setSelectedCampusId(campusId);
    setOpen(true);
    try {
      const response = await axios.get(
        `https://193.140.151.200:443/meksis/get_all_binalar_by_kampus_id/${campusId}/1`
      );
      setBuildingData(response.data);
    } catch (error) {
      console.error('Error fetching building data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Kampüsler</h2>
      <DataGrid
        getRowId={(row) => row.id}
        rows={[campusData.data]}
        columns={campusColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Binalar (Kampüs ID: {selectedCampusId})</DialogTitle>
        <DialogContent>
          <DataGrid
            getRowId={(row) => row.internalId}
            rows={buildingData}
            columns={buildingColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CampusBuildings;
