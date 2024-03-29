import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProductListScreen from './screens/ProductListScreen'
import SSD from './screens/ProductsScreens/SSD'
import HDD from './screens/ProductsScreens/HDD'
import GraphicCards from './screens/ProductsScreens/GraphicCards'
import UserListScreen from './screens/UserListScreen'
import AdminScreen from './screens/AdminScreen'
import NotFound from './screens/NotFound'
import UserEditScreen from './screens/UserEditScreen'
import AdminProductListScreen from './screens/AdminProductListScreen'
import AdminProductEditScreen from './screens/AdminProductEditScreen'
import AdminOrderListScreen from './screens/AdminOrderListScreen'
import SearchResultScreen from './screens/SearchResultScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/products' element={<ProductListScreen />} />
            <Route path='/products/ssd' element={<SSD />} />
            <Route path='/products/hdd' element={<HDD />} />
            <Route path='/products/graphic-cards' element={<GraphicCards />} />

            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen/>} />
            <Route path='/payment' element={<PaymentScreen/>} />
            <Route path='/placeorder' element={<PlaceOrderScreen/>} />
            <Route path='/order/:id' element={<OrderScreen/>} />


            <Route path='/admin' element={<AdminScreen/>} />
            <Route path='/admin/userslist' element={<UserListScreen/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />

            <Route path='/admin/productslist' element={<AdminProductListScreen/>} />
            <Route path='/admin/product/:id/edit' element={<AdminProductEditScreen />} />

            <Route path='/admin/orderlist' element={<AdminOrderListScreen/>} />
            <Route path="/search" element={<SearchResultScreen/>} />

            <Route path="*" element={<NotFound />} />
            
          </Routes>


        </Container>
      </main>
      <Footer />
    </Router>
  );
}



export default App;
