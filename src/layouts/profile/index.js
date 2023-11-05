
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import profilesListData from "layouts/profile/data/profilesListData";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../utils/getLocal";

function Overview() {

  const [user, setUser] = useState({});
  useEffect(async () => {
    const token = getToken();
    const decoded = jwtDecode(token);
    setUser(decoded);
  }, [ ]);

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <ProfileInfoCard
              title="profile information"
              description=""
              info={{
                fullName: user?.name || 'N/A',
                mobile: user?.phone_number || 'N/A',
                nic: user?.nic || 'N/A',
                email: user?.email || 'N/A',
                gender: user?.gender || 'N/A',
                street: user?.steet || 'N/A',
                state: user?.state || 'N/A',
                postal_code: user?.postal_code || 'N/A',
                registered: user?.createdAt || 'N/A',
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="My Pets" profiles={profilesListData} />
          </Grid> */}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
