import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { dressPage1 } from "../../Data/dress/page1";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../State/Admin/Orders/Action";

function RecentOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);

  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/products")}
            variant="caption"
            sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}
          >
            View All
          </Typography>
        }
        titleTypographyProps={{
          variant: "h5",
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsOrder?.orders?.slice(0, 5).map((item, index) => (
              <TableRow
                hover
                key={item.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell>
                  {" "}
                  <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                    {item.orderItems.map((orderItem) => (
                      <Avatar
                        alt={item.title}
                        src={orderItem.product?.imageUrl}
                      />
                    ))}
                  </AvatarGroup>{" "}
                </TableCell>

                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {item?.orderItems.map((order) => (
                        <span className=""> {order.product?.title},</span>
                      ))}
                    </Typography>
                    <Typography variant="caption">{item.brand}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{item.totalDiscountedPrice}</TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Chip
                    sx={{ color: "white" }}
                    label={item.orderStatus}
                    size="small"
                    color="success"
                    className="text-white"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RecentOrders;
