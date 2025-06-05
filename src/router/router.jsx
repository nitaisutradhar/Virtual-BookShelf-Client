import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Shared/NotFound";
import Home from "../pages/Home/Home";
import Terms from "../pages/Shared/Terms";

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
            }
        ]
    }
])
export default router