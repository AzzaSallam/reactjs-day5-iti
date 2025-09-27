import { useFormik } from 'formik';
import * as Yup from "yup";
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",     
      message: "",
    },


    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),

      firstName: Yup.string().trim().required("First name is required"),
      lastName: Yup.string().trim().required("Last name is required"),

      phone: Yup.string().test(
        "is-valid-phone",
        "Phone number is invalid",
        value => !value || isValidPhoneNumber(value || "")
      ),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message cannot exceed 500 characters"),
    }),


    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      setTimeout(() => {
        toast.success("Thanks for contact", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(()=>{
          navigate('/')
        } , 1000)
        console.log(values)

        resetForm();
        setSubmitting(false);
      }, 700); 
    },
  });

  

  return (
    <div className='container mx-auto my-5'>
      <h3 className=' fw-bold'>Contact us</h3>
      <Form className=' w-50 my-3 bg-light p-5 rounded-4 mx-auto' onSubmit={formik.handleSubmit}>
        {/* NAMES INPUTS */}
        <div className=' d-flex align-items-center gap-2 justify-content-between'>
          {/* FIRST NAME */}
          <Form.Group className="mb-3 w-50" controlId="formBasicfname">
            <Form.Control type="text" 
                          placeholder="First name" 
                          name='firstName' 
                          className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
                          value={formik.values.firstName} 
                          onChange={formik.handleChange} 
                          onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </Form.Group>

          {/* LAST NAME */}
          <Form.Group className="mb-3 w-50" controlId="formBasiclname">
            <Form.Control type="text" 
                          placeholder="Last name" 
                          name='lastName' 
                          className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
                          value={formik.values.lastName} 
                          onChange={formik.handleChange} 
                          onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </Form.Group>
        </div>



        {/* EMAIL INPUT AND PHONE*/}
        <div className=' d-flex align-items-center gap-2 justify-content-between'>
          <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" 
                          placeholder="Enter email"
                          name='email'
                          className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`} 
                          value={formik.values.email} 
                          onChange={formik.handleChange} 
                          onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </Form.Group>

          {/* PHONE INPUT */}
          <Form.Group className="mb-3 w-50" controlId="formBasicphone">
            <PhoneInput
              defaultCountry="EG"   
              value={formik.values.phone}
              onChange={(phone) => formik.setFieldValue("phone", phone)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </Form.Group>

        </div>


        {/*TEXT AREA  */}
        <FloatingLabel controlId="floatingTextarea2" label="Comments" className='mb-3'>
            <Form.Control
              as="textarea"
              name='message'
              placeholder="Leave a comment here"
              className={`form-control ${formik.touched.message && formik.errors.message ? "is-invalid" : ""}`}
              style={{ height: '100px' }}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="invalid-feedback">{formik.errors.message}</div>
            )}
        </FloatingLabel>

        {/* SUBMITTING BUTTON */}
        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;