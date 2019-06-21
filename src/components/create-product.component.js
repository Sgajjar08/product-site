import React,{ Component } from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {

    constructor(props){
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeInventoryLevel = this.onChangeInventoryLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            date: '',
            inventory_level: 0
        };
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeInventoryLevel(e) {
        this.setState({
            inventory_level: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newProduct = {
            product_name: this.state.product_name,
            date: this.state.date,
            inventory_level: this.state.inventory_level
        };

        axios.post('http://localhost:4000/products/add', newProduct)
        .then(res => {
            console.log(res.data);
        });

        this.setState({
                product_name: '',
                date: '',
                inventory_level: ''
        });
    }

    render() {
        return (
            <div className="main">
                <h4> Create New Product </h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Product Name: </label>
                        <input type="text" className="form-control" value={this.state.product_name} onChange={this.onChangeProductName} />
                    </div>
                    <div className="form-group">
                        <label> Date (dd-mm-yyyy): </label>
                        <input type="text" className="form-control" value={this.state.date} onChange={this.onChangeDate} />
                    </div>
                    <div className="form-group">
                        <label> Inventory Level: </label>
                        <input type="number" className="form-control" value={this.state.inventory_level} onChange={this.onChangeInventoryLevel} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}