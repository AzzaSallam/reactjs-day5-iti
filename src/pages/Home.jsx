import Products from "./Products";

import { CiShop } from "react-icons/ci";


const Home = () => {

  return (
    <div>
      <div className="container py-5 text-center">
        <h3 className="text-center mb-5 secondaryColor fw-semibold fs-4 "> <CiShop size={30} /> Welcome to Our Shopping website</h3>
        <Products/>
      </div>
    </div>
  )
}

export default Home;
