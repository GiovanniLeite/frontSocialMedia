import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Friends from '../pages/Friends';
import Page404 from '../pages/Page404';
import PrivateRoute from './PrivateRoute';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/profile/:id" element={<PrivateRoute />}>
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route path="/edit-profile/:id" element={<PrivateRoute />}>
        <Route path="/edit-profile/:id" element={<EditProfile />} />
      </Route>
      <Route path="/friends/:id" element={<PrivateRoute />}>
        <Route path="/friends/:id" element={<Friends />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
