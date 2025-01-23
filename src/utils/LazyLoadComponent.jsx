import React, { lazy } from "react";
export const Navbar = lazy(() => import("../components/Navbar"));
export const Login = lazy(() => import("../pages/Login"));
// export const Signup = lazy(() => import("../pages/Signup"));
export const Users = lazy(() => import("../pages/Users"));
export const Listings = lazy(() => import("../pages/Listings"));
export const HomePage = lazy(() => import("../pages/Home"));
export const ProtectedRoute = lazy(() => import("../context/ProtectedRoutes"));
export const Layout = lazy(() => import("../layout/Layout"));
export const CustomSidebar = lazy(() => import("../components/Sidebar/SideNavbar"));