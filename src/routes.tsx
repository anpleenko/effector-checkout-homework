import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { BusketPage } from "./pages/busket/page";
import { CheckoutPage } from "./pages/checkout/page";
import { DeliveryPage } from "./pages/delivery/page";
import { HomePage } from "./pages/home/page";

const ROUTES = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/busket",
    exact: true,
    component: BusketPage,
  },
  {
    path: "/delivery",
    exact: true,
    component: DeliveryPage,
  },
  {
    path: "/checkout",
    exact: true,
    component: CheckoutPage,
  },
  {
    path: "*",
    component: () => <span>Page Not Found</span>,
  },
];

export const Pages: FC = () => renderRoutes(ROUTES);
