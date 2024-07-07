import { useTheme, Box, Typography, Link, Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import React from "react";
import SkeletonGroup from "../layout/skeletonGroup";
import ProductCard from "./productCard";

const ProductCardContainer = ({
  user,
  title,
  category,
  isLoading,
  products,
  disableLink,
}) => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      height={"80vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        position={"relative"}
      >
        <Typography margin={"20px"} color={"text.secondary"}>
          {title}
        </Typography>
        {!disableLink && (
          <Box
            position={"absolute"}
            bottom={18}
            height={"40px"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link
              href={`/category?search=${category}`}
              sx={{
                textDecoration: "none",
              }}
            >
              <Button endIcon={<ArrowRightAlt />}>View more</Button>
            </Link>
          </Box>
        )}
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          borderRadius={"25px"}
          padding={"50px 2vw"}
          border={`1px solid ${theme.palette.grey[400]}`}
          overflow={"hidden"}
        >
          <Box
            width={"100%"}
            mb={"10px"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                bgcolor: "transparent",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "25px",
                bgcolor: theme.palette.grey[300],
              },
              "&::-webkit-scrollbar-thumb:hover": {
                cursor: "pointer",
                bgcolor: theme.palette.grey[400],
              },
            }}
          >
            {isLoading ? (
              <SkeletonGroup
                count={4}
                width={"clamp(80px, 42vw, 250px)"}
                height={"clamp(300px, 50vw, 350px)"}
                flexDirection={"row"}
              />
            ) : (
              <Box display={"flex"} gap={"20px"}>
                {products.map((product) => (
                  <ProductCard {...{ product, user }} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCardContainer;
