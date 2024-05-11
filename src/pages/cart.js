import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Link,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserProductCard from "../components/product/userProductCard";
import ProductWorker from "../scripts/productWorker";
import { ShoppingCartCheckout } from "@mui/icons-material";
import SkeletonGroup from "../components/product/skeletonGroup";

const CartPage = () => {
  const productWorker = new ProductWorker();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  useEffect(() => {
    document.title = "Cart | E-commerce";
  }, []);

  useEffect(() => {
    if (Object.keys(user.payment).length) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <Box
      mt={"100px"}
      minHeight={"100vh"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        width={isNotPhone ? "80%" : "90%"}
        display={"flex"}
        gap={"40px"}
        alignItems={"flex-start"}
      >
        <Box
          width={isNotPhone ? "75%" : "100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          {!isNotPhone && (
            <Box
              mt={"20px"}
              boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
              borderRadius={"25px"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              gap={"20px"}
              padding={"20px 40px"}
            >
              <Typography fontSize={"1.2rem"} fontFamily={"pacifico"}>
                Summary
              </Typography>
              <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                {isLoading ? (
                  <Skeleton variant="rounded" width={"100%"} />
                ) : (
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography fontSize={"0.8rem"}>Subtotal</Typography>
                    <Typography fontSize={"0.8rem"}>
                      {user.payment.currency} {user.cart.total}
                    </Typography>
                  </Box>
                )}
                {isLoading ? (
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    sx={{ mt: "10px" }}
                  />
                ) : (
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography fontSize={"0.8rem"}>
                      *Delivery charges not included
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box
                position={"fixed"}
                bottom={0}
                width={"100%"}
                padding={"20px"}
                boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
                zIndex={2}
                bgcolor={"white"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderRadius={"25px 25px 0px 0px"}
              >
                {isLoading ? (
                  <Skeleton variant="rounded" width={"200px"} />
                ) : (
                  <Typography
                    padding={"10px"}
                    border={`1px solid ${theme.palette.grey[400]}`}
                    borderRadius={"10px"}
                    fontSize={"0.9rem"}
                  >
                    SubTotal: {user.payment.currency} {user.cart.total}
                  </Typography>
                )}
                <Link href="/checkout">
                  <Button
                    startIcon={<ShoppingCartCheckout />}
                    variant="contained"
                    disableElevation
                    disabled={isLoading}
                  >
                    Checkout
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            width={"100%"}
          >
            {isLoading ? (
              <SkeletonGroup count={4} />
            ) : (
              Object.keys(user.cart.items).map((cartItem) => {
                const item = {
                  details: user.cart.items[cartItem].details,
                  product: productWorker.findProduct(cartItem),
                };
                return (
                  <UserProductCard
                    user={user}
                    item={item}
                    type="cart"
                    isLink={true}
                  />
                );
              })
            )}
          </Box>
          <Link href="/" sx={{ alignSelf: "center", margin: "50px 0px" }}>
            <Button variant="contained" disableElevation>
              Continue Shopping
            </Button>
          </Link>
        </Box>
        {isNotPhone && (
          <Box
            boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
            borderRadius={"25px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            gap={"20px"}
            padding={"20px 40px"}
          >
            <Typography fontSize={"1.2rem"} fontFamily={"pacifico"}>
              Summary
            </Typography>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
              {isLoading ? (
                <Skeleton variant="rounded" width={"200px"} />
              ) : (
                <Box display={"flex"} gap={"100px"}>
                  <Typography fontSize={"0.9rem"}>Subtotal</Typography>
                  <Typography fontSize={"0.9rem"}>{user.cart.total}</Typography>
                </Box>
              )}
              {isLoading ? (
                <Skeleton variant="rounded" width={"200px"} />
              ) : (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontSize={"0.9rem"}>VAT</Typography>
                  <Typography fontSize={"0.9rem"}>0.0</Typography>
                </Box>
              )}
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  width={"200px"}
                  sx={{ mt: "20px" }}
                />
              ) : (
                <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                  <Typography fontSize={"0.8rem"}>
                    *Delivery charges not included
                  </Typography>
                </Box>
              )}
            </Box>
            <Link href="/checkout">
              <Button
                startIcon={<ShoppingCartCheckout />}
                variant="contained"
                disableElevation
                disabled={isLoading}
              >
                Checkout
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
