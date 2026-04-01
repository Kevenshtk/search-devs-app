import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import MainRoutes from "./routes";
import './App.css'

function App() {

  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <MainRoutes />
      </Router>
    </ChakraProvider>
  )
}

export default App
