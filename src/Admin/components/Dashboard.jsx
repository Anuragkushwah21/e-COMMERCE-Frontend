import Achievement from "../tables/Achievement";
import { Grid } from "@mui/material";
import MonthlyOverview from "../tables/MonthlyOverview";
import AdminPanel from "./AdminPanel";
import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CustomerTable from "../tables/CustomerTable";
import RecentOrders from "../tables/RecentOrders";
import RecentlyAddedProducts from "../tables/RecentlyAddedProducts";
import SalesOverTime from "../tables/SalesOverTime";

function Dashboard() {
  return (
    <>
      <div className="px-10">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Achievement />
          </Grid>
          <Grid item xs={12} md={8}>
            <MonthlyOverview />
          </Grid>
          <Grid item xs={12} md={8}>
            <SalesOverTime />
          </Grid>
          <Grid item xs={12} md={8}>
            <WeeklyOverview />
          </Grid>
           <Grid item xs={12} md={8}>
            <TotalEarning />
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomerTable />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentOrders />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentlyAddedProducts />
          </Grid>

         
          
        </Grid>
      </div>
    </>
  );
}

export default Dashboard;
