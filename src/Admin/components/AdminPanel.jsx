import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./AdminPanel.css";
import { deepPurple } from "@mui/material/colors";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../State/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../Navigation/AdminNavbar";
import Dashboard from "./Dashboard";
import { customTheme } from "../them/customeThem";
import CreateProducts from "./createProduct/CreateProducts";
import UpdateProduct from "./updateProducts/UpdateProduct";
import ProductsTable from "./Products/ProductsTable";
import OrdersTable from "./Orders/OrdersTable";
import InboxIcon from "@mui/icons-material/Inbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CustomersMyWeb from "./customers/CustomersMyWeb";

const drawerWidth = 240;
const menu = [
  { name: "Dashboard", path: "/admin", Icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", Icon: <DashboardIcon /> },
  { name: "Customers", path: "/admin/customers", Icon: <AccountCircleIcon /> },
  { name: "Orders", path: "/admin/orders", Icon: <DashboardIcon /> },
  // { name: "Total Earnings", path: "/admin", Icon: <AttachMoneyIcon /> },
  // { name: "Weekly Overview", path: "/admin", Icon: <DashboardIcon /> },
  // { name: "Monthly Overview", path: "/admin", Icon: <DashboardIcon /> },
  { name: "Add Product", path: "/admin/product/create", Icon: <AddTaskIcon /> },
];

function AdminPanel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {item.Icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />

        <ListItem onClick={handleLogout} disablePadding>
          <ListItemButton>
            <Avatar
              className="text-white"
              onClick={handleLogout}
              sx={{
                bgcolor: deepPurple[500],
                color: "white",
                cursor: "pointer",
              }}
            >
              {auth.user?.firstName[0].toUpperCase()}
            </Avatar>
            <ListItemText className="ml-5" primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };
  const drawerVariant = isLargeScreen ? "permanent" : "temporary";
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
          <CssBaseline />
          <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />

          <Drawer
            variant={drawerVariant}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                ...(drawerVariant === "temporary" && {
                  top: 0,
                  [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                    {
                      position: "fixed",
                      left: 0,
                      right: 0,
                      height: "100%",
                      zIndex: (theme) => theme.zIndex.drawer + 2,
                    },
                }),
              },
            }}
            open={isLargeScreen || sideBarVisible}
            onClose={handleCloseSideBar}
          >
            {drawer}
          </Drawer>

          <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/product/create"
                element={<CreateProducts />}
              ></Route>
              <Route
                path="/product/update/:productId"
                element={<UpdateProduct />}
              ></Route>
              <Route path="/products" element={<ProductsTable />}></Route>
              <Route path="/orders" element={<OrdersTable />}></Route>
              <Route path="/customers" element={<CustomersMyWeb  />}></Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default AdminPanel;
