import {
  Avatar,
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { dressPage1 } from '../../Data/dress/page1'
import { useNavigate } from "react-router-dom";
import { findProducts } from "../../State/Product/Action";

function RecentlyAddedProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(findProducts({ jwt }));
  }, [jwt]);
  return (
    <Card>
      <CardHeader
        title="Recently Added Products"
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
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.products?.content?.slice(0, 5).map((item) => (
              <TableRow
                hover
                key={item.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell>
                  {" "}
                  <Avatar alt={item.title} src={item.imageUrl} />{" "}
                </TableCell>

                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption">{item.brand}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{"dress"}</TableCell>
                <TableCell>{item.discountedPrice}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RecentlyAddedProducts;
