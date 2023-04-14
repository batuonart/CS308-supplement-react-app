import Products from "./components/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product" element={<Product />}></Route>
            </Routes>
        </Router>
    );
}

export default App;