import { Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './Login';
import Product from './product';
import Dashboard from './dashboard';
import Customer from './Customer';
import Order from './order';
import ProductReport from "./ProductReport";
import Custreport from "./custreport";
import OrderReport from "./orderReport";
import General from "./general";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<Product />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/order" element={<Order />} />
      <Route path="/productReport" element={<ProductReport />} />
      <Route path="/custreport" element={<Custreport />} />
      <Route path="/orderReport" element={<OrderReport />} />
      <Route path="/general" element={<General />} />
    </Routes>
  );
}

export default App;
