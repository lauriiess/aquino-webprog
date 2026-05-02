import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  return (
    <Box sx={{ backgroundColor: "#F9FAFB", minHeight: "100vh", p: 3 }}>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#111827" }}>
        Blossom & Vine Reports
      </Typography>

      <Stack spacing={3}>

        {/* BAR CHART */}
        <Card sx={{ border: "1px solid #e5e7eb", borderRadius: "12px" }}>
          <CardContent>

            <Typography sx={{ color: "#6b8459", fontSize: 12, fontWeight: 600, mb: 2 }}>
              Bouquet Sales Per Season
            </Typography>

            <BarChart
              height={300}
              series={[
                { data: [120, 180, 140, 200], label: 'Bouquets Sold' },
                { data: [90, 150, 110, 170], label: 'Orders Completed' },
              ]}
              xAxis={[
                {
                  data: ['Spring', 'Summer', 'Autumn', 'Winter'],
                  scaleType: 'band'
                }
              ]}
            />

          </CardContent>
        </Card>

        {/* PIE & LINE */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>

          {/* PIE CHART */}
          <Card sx={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "12px" }}>
            <CardContent>

              <Typography sx={{ color: "#6b8459", fontSize: 12, fontWeight: 600, mb: 2 }}>
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
                height={260}
              />

            </CardContent>
          </Card>

          {/* LINE CHART */}
          <Card sx={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "12px" }}>
            <CardContent>

              <Typography sx={{ color: "#6b8459", fontSize: 12, fontWeight: 600, mb: 2 }}>
                Monthly Revenue Growth
              </Typography>

              <LineChart
                height={260}
                series={[
                  {
                    data: [3000, 4200, 3900, 5100, 6000],
                    label: 'Revenue (₱)',
                    showMark: true,
                    curve: "linear",
                  }
                ]}
                xAxis={[
                  {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    scaleType: 'point'
                  }
                ]}
              />

            </CardContent>
          </Card>

        </Stack>

      </Stack>
    </Box>
  );
};

export default ReportsPage;