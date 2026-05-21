import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Blossom & Vine Report</title>
          ${headMarkup}
          <style>
            @page {
              size: A4;
              margin: 16mm;
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell {
              padding: 20px;
            }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 {
              margin: 0 0 6px;
              font-size: 28px;
              font-weight: 700;
            }
            .report-header p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root {
              padding: 20px;
            }
            .report-content svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <div class="report-shell">
            <main>
              <header class="report-header">
                <h1>Blossom & Vine Reports</h1>
                <p>Seasonal bouquet sales, popular flower types, and monthly revenue growth.</p>
                <p>Prepared on ${exportedAt}</p>
              </header>
              <section class="report-content">
                ${printContent.outerHTML}
              </section>
            </main>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleGenerate = () => {
    console.log('Generate clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  return (
    <Box sx={{ backgroundColor: "#F9FAFB", minHeight: "100vh", p: 3, pr: 0 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827" }}>
          Blossom & Vine Reports
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ ml: 'auto', flexWrap: 'wrap' }}
        >
          <Button
            variant="contained"
            onClick={handleGenerate}
            sx={{
              backgroundColor: "#6b8459",
              '&:hover': { backgroundColor: "#557240" }
            }}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            sx={{
              borderColor: "#6b8459",
              color: "#6b8459",
              '&:hover': { borderColor: "#557240", color: "#557240" }
            }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            onClick={handleFilter}
            sx={{
              borderColor: "#6b8459",
              color: "#6b8459",
              '&:hover': { borderColor: "#557240", color: "#557240" }
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>

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

        {/* PIE & LINE CHARTS */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>

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