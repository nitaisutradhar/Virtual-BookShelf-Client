import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Shared/NotFound";
import Home from "../pages/Home/Home";
import Terms from "../pages/Shared/Terms";
import Login from "../pages/SignIn/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            },
            {
                path: '/terms',
                Component: Terms
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    }
])
export default router