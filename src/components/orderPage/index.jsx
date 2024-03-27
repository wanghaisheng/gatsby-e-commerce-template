import React from "react";
import { Box, Button, Link, useMediaQuery } from "@mui/material";
import data from "../../lib/data";
import OrderElement from "./orderElement";

const OrderPageComponent = () => {
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  return (
    <Box
      mt={"100px"}
      minHeight={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      paddingBottom={"50px"}
    >
      <Box
        width={isNotPhone ? "80%" : "90%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"30px"}
      >
        {data.orders.map((order) => (
          <OrderElement {...order} />
        ))}
        <Link href="/" sx={{ alignSelf: "center", margin: "50px 0px" }}>
          <Button variant="contained" disableElevation>
            Continue Shopping
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default OrderPageComponent;
