// src/router/index.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CardActions from "../pages/card-actions/CardActions";
import PaymentStatus from "../pages/payment-status/PaymentStatus";
import Dashboard from "../pages/dashboard/Dashboard";
import TransferPage from "../pages/transfer/TransferPage";

// Layout (optional)
const MainLayout = () => (
  // <div>
  //   <header>Header</header>
  //   <main>
  <Outlet />
  //   {/* </main>
  //   <footer>Footer</footer>
  // </div> */}
);
// / <Balance /> /card-actions <CardActions /> /contacts <ContactsList /> /payments <PaymentInput /> /payment-status <PaymentStatus />
// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/card-actions", element: <CardActions /> },
      { path: "/transfer/:id", element: <TransferPage /> },
      { path: "/payment-status", element: <PaymentStatus /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
