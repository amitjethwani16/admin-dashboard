// @mui material components
import Grid from "@mui/material/Grid";

// Admin Dashboard components
import MDBox from "components/MDBox";

// Admin Dashboard base-components
import DashboardLayout from "base-components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "base-components/Navbars/DashboardNavbar";
import Footer from "base-components/Footer";
import TransformContainer from "./components/TransformContainer";

function Transform() {
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TransformContainer />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Transform;
