// src/router/index.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Balance from "../widgets/balance/Balance";
import Contacts from "../pages/contacts/Contacts";
import CardActions from "../pages/card-actions/CardActions";
import Payments from "../pages/payments/Payments";
import PaymentStatus from "../pages/payment-status/PaymentStatus";

// Layout (optional)
const MainLayout = () => (
  <div>
    <header>Header</header>
    <main>
      <Outlet />
    </main>
    <footer>Footer</footer>
  </div>
);
// / <Balance /> /card-actions <CardActions /> /contacts <ContactsList /> /payments <PaymentInput /> /payment-status <PaymentStatus />
// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Balance /> },
      { path: "/card-actions", element: <CardActions /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/payments", element: <Payments /> },
      { path: "/payment-status", element: <PaymentStatus /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
