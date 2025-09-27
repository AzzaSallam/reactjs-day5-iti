import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

function RegisterForm() {
    const navigate = useNavigate()
    const [formData , setFormData] = useState({
        name :'' ,
        username:'',
        email:'',
        password:'' ,
        confirmPass :''
    });

    const [errors , setErrors] = useState({
        nameErr : '' ,
        usernameErr : '',
        emailErr : '',
        passwordErr : '',
        confirmPassErr:'' 
    });


    const validateName =(name)=>{
        if(!name?.trim()) return "Name is required";
        return '';
    }

    const validateUsername = (username) => {
        if (!username?.trim()) return "Username is required";
        const regx = /^\S+$/; 
        return regx.test(username) ? "" : "Username must not contain spaces";
    };

    const validateEmail = (email)=>{
        if(!email?.trim()) return "Email is required" ;
        const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regx.test(email) ? "" : "Invalid email address";
    }

    const validatePassword = (pass) => {
        if (!pass) return "Password is required";
        const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/;
        if (!regx.test(pass)) {
        return "Password must be at least 8 chars, include lowercase, uppercase, digit and one special char (@ * % $ #)";
        }
        return "";
    };

    const validateConfPass = (pass, confirm) => {
        if (!confirm) return "Confirm Your Password Please";
        return pass === confirm ? "" : "Passwords do not match";
    };

    const handelChangeName =(e)=>{
        const value = e.target.value ;
        setFormData(data => ({...data , name:value}));
        setErrors(err =>({...err , nameErr : validateName(value)}));
    }

    const handelChangeusername =(e)=>{
        const value = e.target.value ;
        setFormData(data => ({...data , username:value}));
        setErrors(err =>({...err , usernameErr : validateUsername(value)}));
    }

    const handelChangeEmail =(e)=>{
        const value = e.target.value ;
        setFormData(data => ({...data , email:value}));
        setErrors(err =>({...err , emailErr : validateEmail(value)}));
    }

    const handelChangePassword = (e) => {
        const value = e.target.value;
        setFormData(data => ({ ...data, password: value }));
        setErrors(err => ({
        ...err,
        passwordErr: validatePassword(value),
        confirmPassErr: validateConfPass(value, formData.confirmPass)
        }));
    };

    const handelChangeConfPass = (e) => {
        const value = e.target.value;
        setFormData(data => ({ ...data, confirmPass: value })); 
        setErrors(err => ({
        ...err,
        confirmPassErr: validateConfPass(formData.password, value)
        }));
    };

    const handelSubmit =(e)=>{
        e.preventDefault();

        const nameValid = validateName(formData.name);
        const usernameValid = validateUsername(formData.username);
        const emailValid = validateEmail(formData.email);
        const passwordValid = validatePassword(formData.password);
        const confirmValid = validateConfPass(formData.password ,formData.confirmPass);

        const newErrors = {
            nameErr : nameValid ,
            usernameErr : usernameValid ,
            emailErr : emailValid ,
            passwordErr : passwordValid ,
            confirmPassErr : confirmValid
        }

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(v => v === "");
        if (!isValid) {
            const allErrors = Object.values(newErrors).filter(v => v !== "").join("\n");
            toast.error(allErrors, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        toast.success(`Welcome ${formData.name}!`, {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            transition: Bounce,
        });

        setFormData({
            name :'' ,
            username:'',
            email:'',
            password:'' ,
            confirmPass :''
        })
        setTimeout(()=>{
            navigate('/')
        } , 1000)

        console.log(formData)
    }

  return (
    <div className='container mx-auto my-4'>
        <h3 className=' fw-bold'>Registrt</h3>
        <Form className=' w-50 bg-light p-4 rounded-4 mx-auto' onSubmit={handelSubmit} noValidate>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input className={`form-control ${errors.nameErr ? "is-invalid" : ""}`} value={formData.name} onChange={handelChangeName} />
            {errors.nameErr && <div className="invalid-feedback">{errors.nameErr}</div>}
        </div>

        <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className={`form-control ${errors.emailErr ? "is-invalid" : ""}`} value={formData.email} onChange={handelChangeEmail} />
            {errors.emailErr && <div className="invalid-feedback">{errors.emailErr}</div>}
        </div>

        <div className="mb-3">
            <label className="form-label">Username</label>
            <input className={`form-control ${errors.usernameErr ? "is-invalid" : ""}`} value={formData.username} onChange={handelChangeusername} />
            {errors.usernameErr && <div className="invalid-feedback">{errors.usernameErr}</div>}
        </div>

        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className={`form-control ${errors.passwordErr ? "is-invalid" : ""}`} value={formData.password} onChange={handelChangePassword} />
            {errors.passwordErr && <div className="invalid-feedback">{errors.passwordErr}</div>}
            <div className="form-text">At least 8 chars, one upper, one lower, one digit and one special (@ * % $ #)</div>
        </div>

        <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className={`form-control ${errors.confirmPassErr ? "is-invalid" : ""}`} value={formData.confirmPass} onChange={handelChangeConfPass} />
            {errors.confirmPassErr && <div className="invalid-feedback">{errors.confirmPassErr}</div>}
        </div>
            <div className=' d-flex gap-4'>
                <button type="submit" className="btn btn-primary">Register</button>
                <Link type="submit" className="btn  btn-outline-primary" to ='/contact-us'>Contact Us</Link>
            </div>
        </Form>
    </div>
  );
}

export default RegisterForm;
