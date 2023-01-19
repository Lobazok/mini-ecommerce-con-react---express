import { SignUp, Login } from "./components/login"

import ProductAdmin from "./components/productFrom"
import {CarroAdmin} from "./components/carro"
import { CarroContexProvider } from "./context/CarroContext";



export const Page = () => {
  if (window.location.pathname === "/SignUp") {
    return <SignUp />
  } else if (window.location.pathname === "/Login") {
    return <Login />
  } else if (window.location.pathname === "/ProductAdmin") {
    return <ProductAdmin/>
  } else
    return <CarroContexProvider>
    <CarroAdmin/>
  </CarroContexProvider>
}
