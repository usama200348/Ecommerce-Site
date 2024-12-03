import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  lessQuantity,
  removeItem,
} from "../config/redux/reducers/cartSlice";

const Cart = () => {
  const selector = useSelector((state) => state.cart.cart);

  const totalPrice = selector.reduce(
    (acc, cval) => acc + cval.price * cval.quantity,
    0
  );

  const formattedTotalPrice = totalPrice.toFixed(2);
  const dispatch = useDispatch();

  const deleteCartItem = (item) => {
    dispatch(removeItem(item));
  };

  const cartItemAddQuantity = (item) => {
    dispatch(addQuantity(item));
  };

  const cartItemLessQuantity = (item) => {
    dispatch(lessQuantity(item));
  };

  return (
    <Box  sx={{ 
      alignItems:'center',
      padding: 2 }}>
      {selector.length > 0 ? (
        <Grid container spacing={2}>
          {selector.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card 
                 sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:'center',
                  justifyContent: "center",
                  padding: 2,
                  boxShadow: 2,
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />

                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs {item.price}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginY: 1,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => cartItemLessQuantity(item)}
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" sx={{ marginX: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => cartItemAddQuantity(item)}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <IconButton
                  color="error"
                  onClick={() => deleteCartItem(item)}
                  sx={{ alignSelf: "center" }}
                >
                  <Delete />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h4" align="center" color="text.secondary">
          No item found.
        </Typography>
      )}

      {selector.length > 0 && (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Divider />
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Total Price: Rs {formattedTotalPrice}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
