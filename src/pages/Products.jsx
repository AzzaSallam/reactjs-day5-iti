import { useEffect, useState } from "react";
import axiosInstance from './../apis/config';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { Bounce, toast } from "react-toastify";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const limit = 8;
  
  useEffect(() => {
    axiosInstance.get("/products" , {
      params: { 
        limit: limit, 
        skip: (page - 1) * limit, 
        sortBy: "name"
      }
    })
    .then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.total); 
    })
    .catch((err) => {
      console.log(err);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handelAddToCart = (product) => {
    dispatch(addToCart({
      id : product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }));
    const existingItem = cartItems.find(item => item.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

    toast.success(`${product.title} added to cart (x${newQuantity})`, {
      position: "top-right",
      autoClose: 2000,
      transition: Bounce,
    });
  }

  return (
    <div className="row text-center">
        {products.map((product) => (
          <div className="col-md-4 col-lg-3 mb-3 mx-auto" key={product.id}>
              <div className=" d-flex justify-content-center align-items-center">
                <Card style={{ width: '20rem' }}>
                  {product.availabilityStatus === "In Stock" ? 
                    <Badge className=" position-absolute m-2 px-3 py-2 rounded-5" bg="success">In Stock</Badge>
                    :
                    <Badge className=" position-absolute m-2 px-3 py-2 rounded-5" bg="danger">Out of Stock</Badge>  
                  }
                  <Card.Img variant="top" src={product.thumbnail} alt={product.title}/>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-2">
                      <Card.Title className="mainColor fs-5 pointer" onClick={()=>navigate(`/product-details/${product.id}`)}> {product.title} </Card.Title>
                      <Card.Subtitle className="mb-2 secondaryColor fw-bold"> <sup>$</sup>{product.price} </Card.Subtitle>
                    </div>
                    <Card.Text className="card-description">
                      {product.description}
                    </Card.Text>

                    {product.availabilityStatus === "In Stock" ? 
                      <Button className=" rounded-5 px-5 bg-success border-0 " onClick={()=>handelAddToCart(product)}>Add To Cart</Button>
                      :
                      <Button variant="outline-success" className="rounded-5 px-5 " disabled>Add To Cart </Button> 
                    }
                    
                  </Card.Body>
                </Card>
              </div>
          </div>
        ))}

       <div className="d-flex justify-content-center mt-4">
        <Pagination>
            <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />

            {page > 3 && (
              <>
                <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
                {page > 4 && <Pagination.Ellipsis disabled />}
              </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((num) => num >= page - 2 && num <= page + 2)
              .map((num) => (
                <Pagination.Item
                  key={num}
                  active={num === page}
                  onClick={() => setPage(num)}
                >
                  {num}
                </Pagination.Item>
              ))}

            {page < totalPages - 2 && (
              <>
                {page < totalPages - 3 && <Pagination.Ellipsis disabled />}
                <Pagination.Item onClick={() => setPage(totalPages)}>
                  {totalPages}
                </Pagination.Item>
              </>
            )}

            <Pagination.Next
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
      </div>

    </div>
  )
};

export default Products;
