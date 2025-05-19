import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ProtectedRoute } from "./ProtectedRoad";
import HomePage from "../pages/HomePage";
import RegisterComponent from "../pages/RegisterComponent";
import LoginComponent from "../pages/LoginComponent";
import MovieList from "../pages/MovieList";
import MoviePage from "../pages/MoviePage";
import MovieForm from "../pages/MovieForm";
import Layout from "../navBar/Layout";
import ProfilePage from "../pages/ProfilePage";

const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                path: "/",
                element: <HomePage/>,
                },
                {
                    path: "/register",
                    element: <RegisterComponent/>,
                },
                {
                    path: "/login",
                    element: <LoginComponent/>,
                },
            ]
        },
    ];

    const routesForAuthenticatedOnly = [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
                path: "/",
                element: <Layout/>,
                children: [
                    {
                    path: "/addmovies",
                    element: <MovieForm />,
                    },
                    {
                    path: "/movies",
                    element: <MovieList />,
                    },
                    {
                    path: "/movies/:id",
                    element: <MoviePage />,
                    },
                    {
                    path: "/",
                    element: <HomePage/>,
                    },
                    {
                    path: "/profile",
                    element: <ProfilePage/>,
                    },
                ]
            },
          ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                path: "/",
                element: <HomePage/>,
                },
                {
                path: "/login",
                element: <LoginComponent/>,
                },
            ]
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);
      
    return <RouterProvider router={router} />; 
};
  
export default Routes;