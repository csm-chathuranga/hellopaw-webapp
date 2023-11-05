import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { getMyPets } from "../../../services/petService"

function ProfilesList({ title, profiles }) {
  
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

  useEffect(async () => {
    getMypetsHandler()
  }, [ ]);

  const renderProfiles = pets.map(({ breed, passbookid,type }) => (
    <SoftBox key={breed} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2}>
        {/* <SoftAvatar src={image} alt="something here" variant="rounded" shadow="md" /> */}
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
          {breed} ({type})
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
          {passbookid}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
          <SoftButton
            component="a"
            target="_blank"
            rel="noreferrer"
            variant="text"
          >
           View
          </SoftButton>
      </SoftBox>
    </SoftBox>
  ));

  
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
