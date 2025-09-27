import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  { LanguageProvider } from './context/langContext';
import Layout from "./component/layout";
import RegisterForm from "./pages/RegisterForm";
import ContactForm from "./pages/ContactForm";


function App() {

  return (
    <BrowserRouter>
      <LanguageProvider>
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
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
      </LanguageProvider>
    </BrowserRouter> 
  )
}

export default App
