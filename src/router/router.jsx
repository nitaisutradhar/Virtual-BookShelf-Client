import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Shared/NotFound";
import Home from "../pages/Home/Home";
import Terms from "../pages/Shared/Terms";
import Login from "../pages/SignIn/Login";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "../routes/PrivateRoute";
import MyBooks from "../pages/My Books/MyBooks";
import UpdateBook from "../pages/My Books/UpdateBook";
import Bookshelf from "../pages/BookShelf/Bookshelf";
import BookDetails from "../pages/BookShelf/BookDetails";


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
            },
            {
                path: '/add-book',
                element: <PrivateRoute><AddBook /></PrivateRoute>
            },
            {
                path: '/my-books',
                element: <PrivateRoute><MyBooks /></PrivateRoute>
            },
            {
                path: '/update-book/:id',
                element: <PrivateRoute><UpdateBook /></PrivateRoute>
            },
            {
                path: '/bookshelf',
                Component: Bookshelf
            },
            {
                path: "/bookshelf/:id",
                element: <PrivateRoute><BookDetails /></PrivateRoute>
            }
        ]
    }
])
export default router