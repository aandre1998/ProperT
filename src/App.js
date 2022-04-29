import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import AdminDashboard from './components/AdminDashboard'; // not started
import AdminPropertyBook from './components/AdminPropertyBook/AdminPropertyBook';
import AdminSingleItem from './components/AdminPropertyBook/AdminSingleItem'; // WIP
import UserPropertyBook from './components/UserPropertyBook/UserPropertyBook';
import SingleItem from './components/UserPropertyBook/SingleItem';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './api/axios';

function App() {
  /* The App component is the main component. It is used to create routes to both public and protected components. */
  
  const [pbItems, setPbItems] = useState([]);

  useEffect(() => {
    axios.getResource('LIN_List').then((initialLINs) => {
      setPbItems(initialLINs);
    });
  }, []);

  const setPbItemsFunction = (newValue) => {
    setPbItems(newValue);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected */}
        <Route element={<RequireAuth allowedRoles={['user','admin']} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['user']} />}>
          <Route path="propertybook" element={<UserPropertyBook data={pbItems}/>} />
          <Route path="propertybook/:itemParam" element={<SingleItem data={pbItems} setData={setPbItemsFunction}/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="adminpropertybook" element={<AdminPropertyBook data={pbItems} setData={setPbItemsFunction} />} />
          <Route path="adminpropertybook/:itemParam" element={<AdminSingleItem data={pbItems} setData={setPbItemsFunction}/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>

        {/* all other routes */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;