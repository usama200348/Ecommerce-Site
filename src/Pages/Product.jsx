import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PList from "../components/Plist.jsx";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addItem } from "../config/redux/reducers/cartSlice.js";
import { Box, CircularProgress } from "@mui/material";
import { RssFeed } from "@mui/icons-material";



function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);

    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const navigate = useNavigate()


  const singleproduct = (product) => {
    navigate(`/singleproduct/${product.id}`)
    console.log("button press");

  }

  const dispatch = useDispatch()

  const addtocartItem = (product) => {
    console.log('product ===> ' , product);
    dispatch(addItem(product))
    
  }
  return (
    <>
      {loading && <h1 className="text-center mb-4"> <Box>
      <CircularProgress className=" flex align-middle mt-40" />
    </Box></h1>}
      {error && <p>Error loading products!</p>}
      <Row className="g-4 p-4 ">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <PList
              title={product.title}
              thumbnail={product.thumbnail}
              // des={product.price}
              des={`Rs ${product.price}`}
              func={() => singleproduct(product)}
              addCart={()=> addtocartItem(product)}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Product