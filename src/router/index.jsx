// src/router/index.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import CardActions from "../pages/card-actions/CardActions";
import PaymentStatus from "../pages/payment-status/PaymentStatus";
import Dashboard from "../pages/dashboard/Dashboard";
import TransferPage from "../pages/transfer/TransferPage";
import TransactionPage from "../pages/transaction/TransactionPage";
import Login from "../pages/login/Login";
import Receipt from "../pages/Receipt/Receipt";

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
      { path: "/", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      // { path: "/card-actions", element: <CardActions /> },
      { path: "/transfer/:id", element: <TransferPage /> },
      { path: "/transaction/:id", element: <TransactionPage /> },
      { path: "/payment-status", element: <PaymentStatus /> },
      { path: "/receipt/:id", element: <Receipt /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
