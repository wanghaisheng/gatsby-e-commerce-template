import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  BookmarkAdded,
  Favorite,
  NotificationsSharp,
} from "@mui/icons-material";
import SideBarElement from "../components/userPage/sideBarElement";
import UserOrders from "../components/userPage/orders";
import OrderDetails from "../components/userPage/orderDetails";
import UserFavourites from "../components/userPage/favourites";
import UserProfile from "../components/userPage/profile";
import Notifications from "../components/userPage/notifications";

const UserPage = () => {
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true)
  const [stages, setStages] = useState({});
  let stage = String(window.location.hash).includes("/")
    ? window.location.hash.substring(1, window.location.hash.indexOf("/"))
    : window.location.hash.substring(1);

  useEffect(() => {
    document.title = `My ${
      stage ? stage.charAt(0).toUpperCase() : "Profile"
    }${stage.substring(1).replace("-", " ")} | Wendoh Cakes`;
  }, [stage]);

  useEffect(() => {
    if(Object.keys(user.payment).length)
      {
        setIsLoading(false)
      }
  }, [user])

  useEffect(() => {
    setStages({
      orders: <UserOrders isLoading={isLoading}/>,
      order: <OrderDetails isLoading={isLoading}/>,
      favourites: <UserFavourites user={user} isLoading={isLoading}/>,
      notifications: <Notifications user={user} isLoading={isLoading}/>,
    });
  }, [user, isLoading]);

  return (
    <Box
      mt={"50px"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={isNotPhone ? "80%" : "90%"}
        height={"80%"}
        display={"flex"}
        border={`1px solid ${theme.palette.grey[400]}`}
        overflow={"hidden"}
        borderRadius={"25px"}
      >
        {isNotPhone && (
          <Box
            width={"400px"}
            height={"100%"}
            borderRight={`1px solid ${theme.palette.grey[400]}`}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Link
              href="/user/#"
              sx={{
                height: "40%",
                color: "black",
                textDecoration: "none",
                bgcolor: !window.location.hash ? "#F5F5F5" : undefined,
              }}
            >
              <MenuItem
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Avatar />
                  <Typography fontWeight={"bold"} fontSize={"1.6rem"}>
                    {user.name.first} {user.name.last}
                  </Typography>
                </Box>
                <Typography fontSize={"0.8rem"} color={"text.secondary"}>
                  logged in
                </Typography>
              </MenuItem>
            </Link>
            <Box display={"flex"} flexDirection={"column"}>
              <SideBarElement
                path={"notifications"}
                stage={stage}
                title={"My notifications"}
                icon={
                  <Badge
                    color="primary"
                    variant="dot"
                    overlap="circular"
                    invisible={!user.notifications.new}
                  >
                    <NotificationsSharp />
                  </Badge>
                }
              />
              <SideBarElement
                path={"orders"}
                stage={stage}
                title={"My orders"}
                icon={<BookmarkAdded />}
              />
              <SideBarElement
                path={"favourites"}
                stage={stage}
                title={"My favourites"}
                icon={<Favorite />}
              />
              <Divider sx={{ margin: "30px" }} />
              <Button
                onClick={() => {}}
                sx={{ alignSelf: "center" }}
                disableElevation
                variant="contained"
              >
                Logout
              </Button>
            </Box>
          </Box>
        )}
        <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {isLoading && <CircularProgress />}
          {!stage && !isLoading && <UserProfile user={user} isLoading={isLoading}/>}
          {!isLoading && stages[stage]}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
