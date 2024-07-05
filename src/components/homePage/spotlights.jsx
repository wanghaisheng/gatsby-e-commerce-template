import React, { useState } from "react";
import data from "../../lib/data";
import Carousel from "../layout/carousel";
import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";

const Spotlights = ({ isLoading }) => {
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  return (
    <Carousel
      width={"100%"}
      height={"70%"}
      index={spotlightIndex}
      setIndex={setSpotlightIndex}
      maxIndex={data.spotlights.length - 1}
      isLoading={isLoading}
      isAuto={true}
      border={true}
      controls={true}
      swipeable={true}
    >
      {data.spotlights.map((spotlight) => (
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={isNotPhone ? "row" : "column-reverse"}
        >
          <Box
            width={isNotPhone ? "50%" : "100%"}
            height={isNotPhone ? "100%" : "50%"}
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            position={"relative"}
          >
            <Box
              width={isNotPhone ? "80%" : "90%"}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={isNotPhone ? "20px" : "1px"}
              >
                <Typography
                  variant="h3"
                  fontSize={"clamp(1rem, 7vw, 2.5rem)"}
                  fontWeight={"bold"}
                >
                  {spotlight.title}
                </Typography>
                <Typography>{spotlight.description}</Typography>
              </Box>
              <Link href={spotlight.action.path}>
                <Button variant="outlined">{spotlight.action.title}</Button>
              </Link>
            </Box>
          </Box>
          <Box
            width={isNotPhone ? "50%" : "100%"}
            height={isNotPhone ? "100%" : "50%"}
            sx={{
              backgroundImage: `url(${spotlight.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default Spotlights;
