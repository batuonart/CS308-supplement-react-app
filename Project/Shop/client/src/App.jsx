import Products from "./components/Products";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/products/:category" element={<Products/>}/>
          <Route exact path="/product/:id" element={<Products/>}/>
        </Routes>
    </Router>
  );
};

export default App;