import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Chip } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  { field: 'role', headerName: 'Role', width: 120, editable: true },

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

  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Ambretta', role: 'Customer', age: 14, status: 'Active' },
  { id: 2, lastName: 'Belladona', firstName: 'Blossom', role: 'Florist', age: 31, status: 'Inactive' },
  { id: 3, lastName: 'Smith', firstName: 'Chrysantha', role: 'Customer', age: 31, status: 'Active' },
  { id: 4, lastName: 'Williams', firstName: 'Erica', role: 'Customer', age: 11, status: 'Active' },
  { id: 5, lastName: 'Baker', firstName: 'Dhalia', role: 'Staff', age: 30, status: 'Inactive' },
  { id: 6, lastName: 'Lee', firstName: 'Daisy', role: 'Florist', age: 23, status: 'Active' },
  { id: 7, lastName: 'Miller', firstName: 'Iris', role: 'Customer', age: 44, status: 'Active' },
  { id: 8, lastName: 'Lopez', firstName: 'John', role: 'Delivery Staff', age: 26, status: 'Active' },
  { id: 9, lastName: 'Martin', firstName: 'Peony', role: 'Customer', age: 65, status: 'Inactive' },
];

function DashboardPage() {
  useLocation();

  const totalOrders = 284;
  const totalRevenue = 12580;
  const fulfillmentRate = 85;
  const satisfactionScore = 4.8;

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", minHeight: "100vh", p: 2 }}>

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#111827", mb: 4 }}
      >
        Blossom & Vine Dashboard
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{
          flex: 1,
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
        }}>
          <CardContent>
            <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600 }}>
              Total Orders
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalOrders}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{
          flex: 1,
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
        }}>
          <CardContent>
            <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600 }}>
              Total Revenue (₱)
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ₱{totalRevenue.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{
          backgroundColor: "#fff",
          p: 2,
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          textAlign: "center",
          flex: 1
        }}>
          <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600, mb: 1 }}>
            Order Fulfillment Rate
          </Typography>
          <Gauge width={120} height={120} value={fulfillmentRate} valueMin={0} valueMax={100} />
        </Box>

        <Box sx={{
          backgroundColor: "#fff",
          p: 2,
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          textAlign: "center",
          flex: 1
        }}>
          <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600, mb: 1 }}>
            Customer Satisfaction
          </Typography>
          <Gauge width={120} height={120} value={satisfactionScore * 20} valueMin={0} valueMax={100} />
        </Box>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          p: 2
        }}>
          <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600, mb: 2 }}>
            Bouquet Sales Per Season
          </Typography>
          <BarChart
            series={[
              { data: [120, 180, 140, 200], label: 'Bouquets Sold' },
              { data: [90, 150, 110, 170], label: 'Orders Completed' },
            ]}
            height={280}
            xAxis={[{ data: ['Spring', 'Summer', 'Autumn', 'Winter'], scaleType: 'band' }]}
          />
        </Box>

        <Box sx={{
          width: 300,
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 2
        }}>
          <Typography sx={{ fontSize: 12, color: "#6b8459", fontWeight: 600, mb: 2 }}>
            Popular Flower Types
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 35, label: 'Roses' },
                  { id: 1, value: 25, label: 'Tulips' },
                  { id: 2, value: 20, label: 'Lilies' },
                  { id: 3, value: 20, label: 'Sunflowers' },
                ],
              },
            ]}
            width={220}
            height={220}
          />
        </Box>
      </Stack>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#111827" }}>
        Recent Customers & Staff
      </Typography>

      <Box sx={{
        height: 420,
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb"
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: "none",
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: "#f9fafb",
              fontWeight: 600,
              color: "#374151"
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: "#f3f4f6"
            }
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600, color: "#111827" }}>
        Shop Location
      </Typography>

      <Box sx={{
        height: 450,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e5e7eb"
      }}>
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>National University-Manila</Popup>
          </Marker>
        </MapContainer>
      </Box>

    </Box>
  );
}

export default DashboardPage;