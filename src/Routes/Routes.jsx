import {
  createBrowserRouter,

} from "react-router";
import Root from "../MainLayout/Root";
import Home from "../Components/Home";
import Fridge from "../Components/Fridge";
import AddFood from "../Components/AddFood";
import MyItems from "../Components/MyItems";
import SignIn from "../Components/Sign/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import ErrorCard from "../Pages/Error";
import CardDetails from "../Pages/DetailsPage/CardDetails";
import PrivateRoute from "../Context/PrivateRoute";
import UpdateFood from "../Components/UpdateFood/UpdateFood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorCard></ErrorCard>,
    children:[
        {
            index: true,
            path: "/",
            loader: () => fetch('http://localhost:3000/foods/limit'),
            element:<Home></Home>,
          hydrateFallbackElement:<span className="loading loading-spinner loading-xs"></span>,
        },
        {
          path: "/fridge",
          loader: () => fetch('http://localhost:3000/foods',{
            credentials:'include'
          }),
          hydrateFallbackElement:<span className="loading loading-spinner loading-xs"></span>,
          element: <Fridge></Fridge>
        },
        {
          path: "/add-food",
          element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
        },
        {
          path: "/foods/:id",
          loader: ({params}) => fetch(`http://localhost:3000/foods/${params.id}`),
          element: <PrivateRoute><CardDetails></CardDetails></PrivateRoute>,
          hydrateFallbackElement:<span className="loading loading-spinner loading-xs"></span>,
        },
        {
          path: "/my-items",
          element: <PrivateRoute><MyItems></MyItems></PrivateRoute>,
          loader: () => fetch('http://localhost:3000/foods'),
          hydrateFallbackElement:<span className="loading loading-spinner loading-xs"></span>,
        },
        {
          path: "/update-food/:id",
          element:<UpdateFood></UpdateFood>,
          loader: ({params}) => fetch(`http://localhost:3000/foods/${params.id}`),
          hydrateFallbackElement:<span className="loading loading-spinner loading-xs"></span>,
        },
        {
          path: "/sign-in",
          element:<SignIn></SignIn>
        },
        {
          path: "/sign-up",
          element: <SignUp></SignUp>
        }
    ]
  },
]);