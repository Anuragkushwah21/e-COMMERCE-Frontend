import React from "react";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexCharts from 'react-apexcharts';
// import ReactApexcharts from 'src/@core/components/react-apexcharts'  
function WeeklyOverview() {
  return (
    <Card>
      <CardHeader
        title="Weekly Overview"
        titleTypographyProps={{
          sx: {
            lineHeight: "0rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent
        sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 } }}
      >
        
        <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
          <Typography variant="h5" sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant="body2">
            Your sales performance is 45% 😎 better compared to last month
          </Typography>
        </Box>
        <Button fullWidth variant="contained">
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default WeeklyOverview;
