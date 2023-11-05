import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { getMyPets } from "../../../../services/petService"
import Bill from "layouts/mypets/components/Bill";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

function BillingInformation() {

  const [pets, setPets] = useState([]);
  
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

  useEffect(() => {
    getMypetsHandler()
  }, [ ]);

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
        My pets
        </SoftTypography>
        <SoftButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new Pet
        </SoftButton>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        {pets.map(({ breed, passbookid,type,color }) => (
          <>
            <Bill
              name={breed}
              color={color}
              type={type}
              vat={passbookid}
            />

          </>
        ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
