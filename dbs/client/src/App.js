
import './App.css';
import Home from './pages/Home';
import {BrowserRouter , Routes , Route , Link} from "react-router-dom"
import Users from './pages/Users';
import Products from './pages/Products';
function App() {
  return (
    <div className="App">

      


      <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/products">Products</Link>
      <Routes>
      <Route path ="/" element = {<Home/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/products" element = {<Products/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
