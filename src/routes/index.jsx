import React , { Suspense } from "react";

import Layout from "../component/layout";
import ContactForm from "../pages/ContactForm";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";


const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const RegisterForm = React.lazy(() => import("../pages/RegisterForm"));
const Cart = React.lazy(() => import("../pages/Cart") )


export default function RoutesList() {

  return (
    <Suspense fallback={<h3 className=" text-center fw-bold fs-4">Loading...</h3>}>
      <Routes>
        <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contact-us' element={<ContactForm />} />
            <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
