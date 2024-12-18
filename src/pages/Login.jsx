import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
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

    console.log("form submitted : ", formData);
    dispatch(login(formData)).then((action) => {
      if (action.payload.success) {
        toast(action.payload.message);
        navigate("/tasks");
      } else {
        toast.error(action.payload.message);
      }
    });
  }
  return (
    <div>
      <p> This is a login component </p>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" onChange={changeHandler} />
        <input type="password" name="password" onChange={changeHandler} />
        <button type="submit">Login </button>
      </form>
    </div>
  );
};

export default Login;
