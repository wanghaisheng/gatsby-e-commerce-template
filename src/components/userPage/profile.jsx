import React from "react";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import data from "../../lib/data";
import {
  AccountCircle,
  AddCircle,
  Explore,
  Mail,
  Phone,
} from "@mui/icons-material";
import UserProfileDetail from "./profileDetail";
import AddressItem from "./addressItem";

const UserProfile = () => {
  const theme = useTheme();
  return (
    <Box
      maxWidth={"100%"}
      height={"100%"}
      padding={"20px"}
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
    >
      <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
        <UserProfileDetail
          icon={<AccountCircle />}
          title={"Name"}
          value={`${data.user.name.first} ${data.user.name.last}`}
        />
        <UserProfileDetail
          icon={<Mail />}
          title={"Email"}
          value={data.user.email}
        />
        <UserProfileDetail
          icon={<Phone />}
          title={"Phone no"}
          value={`(${data.user.phone.code}) ${data.user.phone.number}`}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        border={`1px solid ${theme.palette.grey[400]}`}
        borderRadius={"25px"}
        overflow={"hidden"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          padding={"20px"}
          boxShadow={`0px 1px 10px 0px ${theme.palette.grey[300]}`}
        >
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Explore />
            <Typography fontWeight={"bold"}>Addresses</Typography>
          </Box>
          <Tooltip title="add an address">
            <IconButton>
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          height={"100%"}
          maxWidth={"100%"}
          padding={"20px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
          sx={{ overflowY: "scroll" }}
        >
          {data.user.addresses.map((add) => (
            <AddressItem {...add} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;