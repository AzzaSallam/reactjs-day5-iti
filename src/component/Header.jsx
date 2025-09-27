import { MdAddShoppingCart } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {  useContext } from "react";
import { useSelector } from "react-redux";
import { LanguageContext } from "../context/langContext";

const Header =()=> {
    const {lang , setLang , dir} = useContext(LanguageContext)
    const totalItems = useSelector((state)=> state.cart.totalQuantity);


  return (
       <nav className="navbar navbar-expand-lg bg-body-tertiary" dir={dir}>
        <div className="container-fluid px-5">
            <Link to='/' className="navbar-brand fw-bold mainColor" >
            <FaShopify color="#37353E" /> Shopify
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div
                className={`navbar-nav d-flex justify-content-between align-items-center gap-4 ${
                lang === "ar" ? "me-auto" : "ms-auto"
                }`}
            >
                {/* Cart */}
                <Link className="nav-link position-relative" to="/cart">
                {totalItems > 0 && (
                    dir === "rtl" ? (
                        <span
                        className="badge bg-danger rounded-circle position-absolute"
                        style={{
                            top: "0",
                            right: "4px",
                            fontSize: "12px",
                            padding: "4px 7px",
                        }}
                        >
                        {totalItems}
                        </span>
                    ) : (
                        <span
                        className="badge bg-danger rounded-circle position-absolute"
                        style={{
                            top: "0",
                            left: "19px",   
                            fontSize: "12px",
                            padding: "4px 7px",
                        }}
                        >
                        {totalItems}
                        </span>
                    )
                )}
                <MdAddShoppingCart size={27} color="#275ae6ff" />
                </Link>

                {/* Language */}
                <span
                className="bg-white p-2 rounded-3 border fw-bold secondaryColor pointer text-decoration-none"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                >
                {lang === "ar" ? "EN" : "AR"}
                </span>

                {/* Register */}
                <Link
                className="text-decoration-none btn btn-outline-primary"
                to="/register"
                >
                Register
                </Link>
            </div>
            </div>
        </div>
    </nav>

  );
}

export default Header;
