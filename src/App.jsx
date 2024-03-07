import { Route , Routes , BrowserRouter as Router } from "react-router-dom";
import Page from "./pages/Page";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";



const App  = () => {


  return (
    <Router>
          <Routes>
            <Route path="/" element={<Page/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
    </Router>
  )
}


export default App;