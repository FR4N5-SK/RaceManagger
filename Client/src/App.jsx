import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TERipple, TEInput } from 'tw-elements-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './views/Login';
import Recovery from './views/Recovery';
import Register from './views/Register';
import Landing from './views/Landing';
import Admin from './admin/Admin';
import AdminAthletes from './admin/views/AdminAthletes';
import AdminCompetitions from './admin/views/AdminCompetitions';
import AdminUsers from './admin/views/AdminUsers';

function Default() {
  return (
    <></>
  )
}

function example() {
  return (
    <h2 className="text-3xl font-bold underline">
      {" "}
      Recuperación clave
    </h2>
  )
}

function example2() {
  return (
    <h2 className="text-3xl font-bold underline">
      {" "}
      Registro
    </h2>
  )
}

function example3() {
  return (
    <h2 className="text-3xl font-bold underline">
      {" "}
      Inicio
    </h2>
  )
}

/*Enrutador de la web*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute defaultComponent={Login} userComponent={Landing} adminComponent={Landing} />,
  },
  {
    path: "/registro",
    element: <ProtectedRoute defaultComponent={Register} userComponent={Landing} adminComponent={Landing} />,
  },
  {
    path: "/recuperacion",
    element: <ProtectedRoute defaultComponent={Recovery} userComponent={Landing} adminComponent={Landing} />,
  },
  {
    path: "/inicio",
    element: <ProtectedRoute defaultComponent={Login} userComponent={Landing} adminComponent={Landing} />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute adminComponent={Admin} defaultComponent={Login} userComponent={Landing} />,
  },
  {
    path: "/admin/athletes",
    element: <ProtectedRoute adminComponent={AdminAthletes} defaultComponent={Login} userComponent={Landing} />
  },
  {
    path: "/admin/competitions",
    element: <ProtectedRoute adminComponent={AdminCompetitions} defaultComponent={Login} userComponent={Landing} />
  },
  {
    path: "/admin/users",
    element: <ProtectedRoute adminComponent={AdminUsers} defaultComponent={Login} userComponent={Landing} />
  },
  {
    path: "*",
    element: (
      <h2 className="text-3xl font-bold underline">
        {" "}
        Pagina de Error
      </h2>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
