import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/authPages/Login";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/userPages/homePage";
import SearchPage from "./pages/userPages/SearchPage";
import AddNewMovie from "./pages/adminPages/AddNewMovie";
import {
  AuthenticatedRoute,
  AdminRoute,
  PublicRoute,
} from "./routes/ProtectedRoutes";
const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },

    {
      element: <AuthenticatedRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              path: "home",
              element: <HomePage />,
            },
            {
              path: "search",
              element: <SearchPage />,
            },

            {
              element: <AdminRoute />,
              children: [
                {
                  path: "admin/add-new-movie",
                  element: <AddNewMovie />,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;