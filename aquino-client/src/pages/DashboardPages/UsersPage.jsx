import React from 'react';
import { Box, Typography, Card, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'Name', width: 160 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'role', headerName: 'Role', width: 140 },
  { field: 'orders', headerName: 'Orders', width: 120 },

  // ✅ NEW STATUS COLUMN
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
  <Chip
    label={params.value}
    size="small"
    sx={{
      fontWeight: 600,
      backgroundColor:
        params.value === 'Active'
          ? 'rgba(59, 130, 246, 0.1)'  
          : 'rgba(239, 68, 68, 0.1)',  
      color:
        params.value === 'Active'
          ? '#2563eb' 
          : '#dc2626',
    }}
  />
),
  },
];

const rows = [
  { id: 1, firstName: 'Ava Green', email: 'ava@email.com', role: 'Customer', orders: 5, status: 'Active' },
  { id: 2, firstName: 'Liam Rose', email: 'liam@email.com', role: 'Customer', orders: 2, status: 'Inactive' },
  { id: 3, firstName: 'Emma Bloom', email: 'emma@email.com', role: 'Florist', orders: 0, status: 'Active' },
  { id: 4, firstName: 'Noah Petals', email: 'noah@email.com', role: 'Delivery Staff', orders: 0, status: 'Active' },
  { id: 5, firstName: 'Olivia Garden', email: 'olivia@email.com', role: 'Customer', orders: 8, status: 'Inactive' },
];

const UsersPage = () => {
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", minHeight: "100vh", p: 3 }}>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#111827" }}>
        Customers & Staff
      </Typography>

      <Card sx={{ border: "1px solid #e5e7eb", borderRadius: "12px" }}>

        <Box sx={{ height: 500, width: '100%', p: 1 }}>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}

            // ✅ ENABLE SELECTION LIKE DASHBOARD
            checkboxSelection

            disableRowSelectionOnClick

            sx={{
              border: "none",

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: "#f9fafb",
                color: "#374151",
                fontWeight: 600
              },

              '& .MuiDataGrid-row:hover': {
                backgroundColor: "#f3f4f6"
              },

              '& .MuiDataGrid-cell': {
                fontSize: 13
              },

              '& .MuiDataGrid-footerContainer': {
                borderTop: "1px solid #e5e7eb"
              }
            }}
          />

        </Box>

      </Card>

    </Box>
  );
};

export default UsersPage;