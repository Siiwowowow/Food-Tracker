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
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorCard></ErrorCard>,
    children:[
        {
            index: true,
            path: "/",
            element:<Home></Home>
        },
        {
          path: "/fridge",
          element: <Fridge></Fridge>
        },
        {
          path: "/add-food",
          element: <AddFood></AddFood>
        },
        {
          path: "/my-items",
          element: <MyItems></MyItems>
        },
        {
          path: "/sign-in",
          element:<SignIn></SignIn>
        },
        {
          path: "/sign-up",
          element: <SignUp></SignUp> // Placeholder for SignUp component
        }
    ]
  },
]);