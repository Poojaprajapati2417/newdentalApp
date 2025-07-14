import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Profile from "./Components/doctorprofile/Profile.jsx"
import ViewProfile from './Components/doctorprofile/ViewProfile.jsx';
import ViewPatients from "./Components/patients/ViewPatients.jsx"
import Editdoctor from './Components/doctorprofile/Editdoctor.jsx';
import AdminPanel from './Components/adminPanel/AdminPanel.jsx';
import AddClinic from './Components/clinics/AddClinic.jsx';
import ViewClinic from './Components/clinics/ViewClinic.jsx';
import Editclinic from './Components/clinics/Editclinic.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* register user form */}
      <Route index element={<Register />} />
      {/* login user form  */}

      <Route path='/login' element={<Login />} />
      {/* add /create doc profile form  */}
      <Route path='add' element={<Profile />} />


      <Route path='doctor/edit/:id' element={<Editdoctor />} />
      <Route path='doctor/view' element={<ViewProfile />} />


      <Route path='patients/view' element={<ViewPatients />} />

      <Route path='/Clinics/add' element={<AddClinic />} />
      <Route path='/Clinics/view' element={<ViewClinic />} />

      <Route path='clinic/edit/:id' element={<Editclinic />} />





    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

