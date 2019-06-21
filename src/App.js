import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "./components/create-product.component";
import EditProduct from "./components/edit-product.component";
import ProductList from "./components/product-list.component";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container"> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand"> Product Dashboard </Link>
          <div className="collapse nav-collapse">
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
                <Link to="/" className="nav-link"> Products </Link>                
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link"> Create Product </Link>                
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={ProductList} />
        <Route path="/edit/:id" component={EditProduct} />
        <Route path="/create" component={CreateProduct} />
      </div>
     </Router>
  );
}

export default App;
