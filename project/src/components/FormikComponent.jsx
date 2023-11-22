import useLocalStorage from "../hooks/useLocalStorage";
import * as Yup from "yup"
import { useFormik } from "formik"

const FormikComponent = () => {
    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username should not be empty'),
      email: Yup.string().email('Email is not exist').required('Email should not be empty'),
      password: Yup.string().required('Password should not be empty'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords is not similar')
        .required('Confirm password should not be empty'),
    });
  
    const initialValues = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  
    const [storedUser, setStoredUser] = useLocalStorage('user', initialValues);

    const formik = useFormik({
        initialValues: storedUser,
        validationSchema,
        onSubmit: (values) => {
          setStoredUser(values);
          console.log('Form göndərildi:', values);
        },
      });
  
    return (
        <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
  
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
  
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
  
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
  
        <button type="submit" disabled={!formik.isValid}>Submit</button>
      </form>
    );
  };
  
  export default FormikComponent;