import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MainRoutes from "./routes";

function App() {

  return (
    <ChakraProvider>
      <Router>
        <MainRoutes />
      </Router>
    </ChakraProvider>
  )
}

export default App
