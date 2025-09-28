import { BrowserRouter} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  { LanguageProvider } from './context/langContext';
import RoutesList from "./routes";



function App() {

  return (
    <BrowserRouter>
      <LanguageProvider>
          <RoutesList/>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
      </LanguageProvider>
    </BrowserRouter> 
  )
}

export default App
