
import './App.css';
import Navbars from './Components/Navbar/navbars';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Footer from './Components/Footer/Footer';
import bridal_banner from './Components/imagess/bridal_banner.jpg'
import evening_banner from './Components/imagess/bridal_banner.jpg'
import bridesmaid_banner from './Components/imagess/bridal_banner.jpg'
import ForgotPassword from './Components/ForgetPassword/ForgetPassword';
import Success from './Components/Success';
import Cancel from './Components/Cancel';
import UserProfile from './Components/UserProfile/UserProfile';
import { BrowserRouter as Router } from 'react-router-dom';
import PurchaseHistory from './pages/PurchaseHistory';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbars />
       
          <Routes>
            <Route path='/' element={<Shop/>}></Route>
            <Route path='/bridal' element={<ShopCategory banner={bridal_banner} category="bridal"/>}></Route>
            <Route path='/about' element={<ShopCategory  category="about"/>}></Route>
            <Route path='/evening' element={<ShopCategory banner={evening_banner} category="evening"/>}></Route>
            <Route path='/bridemaid' element={<ShopCategory banner={bridesmaid_banner} category="bridesmaid"/>}></Route>
            <Route path='product' element={<Product></Product>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>

            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/login' element={<LoginSignup/>}></Route>
            <Route path='/forgetpassword' element={<ForgotPassword/>}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
          <Route path='/purchasehistory' element={<PurchaseHistory/>}></Route>

            <Route path='/success' element={<Success/>}></Route>
            <Route path='/cancel' element={<Cancel/>}></Route>


          </Routes>

          
          <Footer />
          
      </BrowserRouter>
  
    </div>
    
  );
  
}

export default App;
