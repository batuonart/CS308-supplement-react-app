import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Orders from "./pages/Orders";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import Search from "./pages/Search";


const App = () => {

    const user = useSelector( state => state.user.currentUser );
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>       
                <Route path="/register" element={ user ? <Navigate to="/" /> : <Register />}></Route>
                <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product/:id" element={<Product />}></Route>
                <Route path="/products/:category" element={<ProductList />}></Route>
                <Route path="/success" element={<Success />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/orders" element={<Orders />}></Route>

            </Routes>
        </Router>
    );
}

export default App;