import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import Tasks from './pages/Tasks';
import Task from './components/Task';
import Header from './components/common/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        {/*  these two  are open routes  */}
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>

        {/*  protected routes, authentication and authorization */}
        <Route element={<ProtectedRoute></ProtectedRoute>}>

          {/*  child routes  */}
          <Route path='tasks' element={<Tasks></Tasks>}></Route>
          <Route path='/tasks/:id' element={<Task></Task>}></Route>
          <Route path='/tasks/add' element={<Task></Task>}></Route>

        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
