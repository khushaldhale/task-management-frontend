import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getAllTasks } from "../redux/slices/taskSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => {
    return state.task.tasks;
  });

  const getTasks = async () => {
    dispatch(getAllTasks()).then((action) => {
      if (action.payload.success) {
        toast(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <p> This all are Tasks </p>

      {tasks?.length > 0 ? (
        tasks?.map((element) => {
          return (
            <div key={element._id}>
              <p>{element.task_name}</p>
              <p>{element.task_desc}</p>
              <p>{element.task_cat}</p>
              {/* we  have to format the date here  */}
              <p>{element.task_deadline}</p>
              <button
                onClick={() => {
                  navigate(`/tasks/${element._id}`);
                }}
              >
                {" "}
                Update Task{" "}
              </button>
              <button
                onClick={() => {
                  dispatch(deleteTask({ _id: element._id }));
                }}
              >
                {" "}
                Delete Task{" "}
              </button>
            </div>
          );
        })
      ) : (
        <p> No Task is created yet </p>
      )}
    </div>
  );
};

export default Tasks;
