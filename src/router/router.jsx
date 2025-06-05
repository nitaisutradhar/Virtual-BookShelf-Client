import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Shared/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <NotFound />,
        children: []
    }
])
export default router