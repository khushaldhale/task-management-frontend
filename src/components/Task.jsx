import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addTask, updateTask } from "../redux/slices/taskSlice";

//  receiving the data which is sent as a props
const Task = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [formData, setformData] = useState({
    task_name: "",
    task_desc: "",
    task_cat: "",
    task_deadline: "",
  });
  //  to get the id  while updating data
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  fetch specified task data
  const fetchTask = async () => {};
  useEffect(() => {});

  function changeHandler(event) {
    const { name, value } = event.target;

    setformData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);

    //  now this date is converted to utc
    const required_date = new Date(formData.task_deadline);
    formData.task_deadline = required_date.toISOString();

    //  we are providing required date to  backend
    if (path === "add") {
      dispatch(addTask(formData)).then((action) => {
        if (action.payload.success) {
          navigate("/tasks");
        }
      });
    } else {
      dispatch(updateTask({ ...formData, _id: params.id })).then((action) => {
        if (action.payload.success) {
          navigate("/tasks");
        }
      });
    }
  }

  return (
    <div>
      <p> This is a Task </p>
      <form onSubmit={submitHandler}>
        <input type="text" name="task_name" onChange={changeHandler} /> <br />
        <textarea
          cols="40"
          rows="5"
          name="task_desc"
          onChange={changeHandler}
        ></textarea>{" "}
        <br />
        <input
          type="datetime-local"
          name="task_deadline"
          onChange={changeHandler}
        />
        <br />
        <select name="task_cat" onChange={changeHandler}>
          <option value="personal">Personal </option>
          <option value="professional">Professional </option>
          <option value="career">Career </option>
        </select>{" "}
        <br />
        <button type="submit">
          {path === "add" ? "Add Task" : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default Task;
