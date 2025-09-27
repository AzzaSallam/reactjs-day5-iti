import  {  useEffect, useState } from 'react'
import axiosInstance from '../apis/config';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { Bounce, toast } from 'react-toastify';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cart.cartItems);
  const [product , setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
    .then((res) => setProduct(res.data))
    .catch((err) => console.log(err))
  }, [])

  console.log(product);

  const handelAddToCart = () => {
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
    <div className='container row py-5 mx-auto my-5'>
      <div className='col-md-6'>
        <div className='bg-light  h-100 d-flex justify-content-center align-items-center p-3 border rounded-3'>
          <img className='' src={product?.thumbnail} alt={product.title}/>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='border-bottom mb-3 pb-3'>
          <h1 className='fw-bold secondaryColor'>{product?.title}</h1>
          <p className=' small'>{product?.description}</p>
          <p className=' text-warning'> <span className='secondaryColor'>Rating :</span> {product?.rating}</p>
        </div>
        
        <div className='border-bottom mb-3 pb-3'>
          <h5 className='text-secondary '>Price: $ {product?.price}</h5>
          {product.discountPercentage && <h5 className='text-success'>Discount: {product?.discountPercentage} %</h5>}
        </div>

        <div className='border-bottom mb-3 pb-3'>
          {product.availabilityStatus === "In Stock" ? 
              <Badge className=" px-3 py-2 rounded-5" bg="success">In Stock</Badge>
                :
              <Badge className="px-3 py-2 rounded-5 " bg="danger">Out of Stock</Badge>  
            }
            <p className='secondaryColor my-3 d-flex gap-4 align-items-center'>
            <span className='bg-light py-2 px-4 rounded-3 fw-semibold '>{product?.category}</span> {product.brand && <span className='bg-light py-2 px-4 rounded-3 fw-semibold'>{product?.brand}</span> }
          </p>
        </div>

        <div className='d-flex gap-4 align-items-center'>
          <Button className='px-5 py-2 rounded-5 bg-secondary border-0' onClick={()=>navigate('/')}>Continue Shoppind</Button>
          {product.availabilityStatus === "In Stock" ?
            <Button variant="outline-success" className='px-5 py-2 rounded-5' onClick={handelAddToCart}>Add To Cart</Button> 
          :
            <Button variant="outline-success" disabled className='px-5 py-2 rounded-5'>Add To Cart</Button> 
          }
        </div>

      </div>
    </div>
  )
}

export default ProductDetails;
