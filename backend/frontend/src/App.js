import Header from "./components/Header";
import Footer from "./components/Footer";

import {HashRouter as Router, Routes, Route} from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";

import ProductScreen from "./screens/ProductScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

import LoginScreen from "./screens/LoginScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";

import {motion} from "framer-motion";

import AboutScreen from "./screens/AboutScreen";
import SupportScreen from "./screens/SupportScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import ReturnScreen from "./screens/ReturnScreen";
import ContractScreen from "./screens/ContractScreen";
import PrivacyScreen from "./screens/PrivacyScreen";

import GoUpArrow from "./components/GoUpArrow";
import GoToVk from "./components/GoToVK";


function App() {
    return (
        <Router>
            <Header/>
            <motion.main className='mb-3'>
                <Routes>
                    <Route path='/' element={<HomeScreen/>} exact/>
                    <Route path='/login' element={<LoginScreen/>}/>
                    <Route path='/register' element={<RegisterScreen/>}/>
                    <Route path='/profile' element={<ProfileScreen/>}/>
                    <Route path='/shipping' element={<ShippingScreen/>}/>
                    <Route path='/payment' element={<PaymentScreen/>}/>
                    <Route path='/placeorder' element={<PlaceOrderScreen/>}/>

                    <Route path='/about' element={<AboutScreen/>}/>
                    <Route path='/support' element={<SupportScreen/>}/>
                    <Route path='/delivery' element={<DeliveryScreen/>}/>
                    <Route path='/return' element={<ReturnScreen/>}/>
                    <Route path='/contract' element={<ContractScreen/>}/>
                    <Route path='/privacy' element={<PrivacyScreen/>}/>

                    <Route path='/order/:id' element={<OrderScreen/>}/>
                    <Route path='/admin/orderlist/' element={<OrderListScreen/>}/>

                    <Route path='/product/:id/' element={<ProductScreen/>}/>
                    <Route path='/cart/:id?' element={<CartScreen/>}/>

                    <Route path='/admin/userlist' element={<UserListScreen/>}/>
                    <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>

                    <Route path='/admin/productlist' element={<ProductListScreen/>}/>
                    <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
                </Routes>
            </motion.main>
            {
                (window.innerWidth > 767) && <GoUpArrow/>
            }
            <GoToVk/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </Router>
    );
}

export default App;
