import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}



export default App;
