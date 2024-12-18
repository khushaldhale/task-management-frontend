import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function changeHandler(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);

    // manually  setting up the accountType
    formData.accountType = "user";
    dispatch(register(formData)).then((action) => {
      if (action.payload.success) {
        toast(action.payload.message);
        navigate("/login");
      } else {
        toast(action.payload.message);
      }
    });
  }
  return (
    <div>
      <p> This is a register form</p>

      <form onSubmit={submitHandler}>
        <input type="text" name="fname" onChange={changeHandler} />
        <input type="text" name="lname" onChange={changeHandler} />
        <input type="email" name="email" onChange={changeHandler} />
        <input type="password" name="password" onChange={changeHandler} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
