
import Grid from "@mui/material/Grid";
import * as React from 'react';

import SoftBox from "components/SoftBox";

import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import BillingInformation from "layouts/mypets/components/BillingInformation";
import Transactions from "layouts/mypets/components/Transactions";
import TemporaryDrawer from "layouts/mypets/components/editpet";
import { getMyPets } from "../../services/petService"


function MyPets() {
  const [open, setOpen] = React.useState(false);

  const [pets, setPets] = React.useState([]);

  const [selected, setSelected] = React.useState([]);


  const handleEdit =(id)=>{
    setSelected([]);
   let selected= pets.filter((item)=> item.id === id )[0];
    setSelected(selected);
    setOpen(true)
  }

  const getMypetsHandler = async () => {
    try {
      const { data } = await getMyPets();
      setPets(data?.pets || [])
      console.log(data.pets);
    } catch (ex) {
      if (ex.response && ex.response.status === 400 ) {
        // error here
      }
    }
  };

  React.useEffect(() => {
    getMypetsHandler()
  }, [ ]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
        </SoftBox>
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation open={open} setOpen={setOpen} pets={pets} handleEdit={handleEdit}/>
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
              <TemporaryDrawer open={open} setOpen={setOpen} getMypetsHandler={getMypetsHandler} selected={selected}/>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyPets;
