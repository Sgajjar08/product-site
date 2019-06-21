import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td>{props.product.date}</td>
        <td>{props.product.inventory_level}</td>
        <td>
            <Link to={"/edit/"+props.product._id}> Edit </Link>
        </td>
    </tr>
)

const Chart = props => (
    <Plot
    data={[
      {
          type: 'bar',
          x: [props.product.date],
          y: [props.product.inventory_level],
          marker: {
            color: 'purple',
            opacity: 0.6,
          }
        },
    ]}
    layout={ {width: '100%', height: 300, title: 'An Inventory level chart for '+ props.product.product_name} }
    ></Plot>
)

export default class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: [],
            selectedProduct: [],
        };

        this.onChangeProductSelection = this.onChangeProductSelection.bind(this);
    }

    onChangeProductSelection(e) {
        let index = this.state.products.findIndex(product=> product.product_name===e.value);
        this.setState({
            selectedProduct: this.state.products[index]
        });
    }

    componentDidMount(){
        axios.get('http://localhost:4000/products/')
        .then(res => {
            this.setState({products: res.data, 
                selectedProduct: res.data[0]});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    productList(){
        return <Product product={this.state.selectedProduct}/>;
    }

    inventoryChart(){
        return <Chart product={this.state.selectedProduct}/>;
    }

    render(){
        return (
            <div className="main">
                <h4> Select Product </h4>
                <div>
                    <Dropdown options={this.state.products.map((function(object){return object.product_name}))} 
                    selection value={this.state.selectedProduct ? this.state.selectedProduct.product_name : false} 
                    onChange={this.onChangeProductSelection} />
                </div>
                <div>
                    {
                        this.state.selectedProduct ? this.inventoryChart() :null
                    }
                </div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th> Product Name </th>
                            <th> Date </th>
                            <th> Inventory Level </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.state.selectedProduct ?
                            this.productList()
                            :null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}