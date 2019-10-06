import React from 'react';
import './Product.css';

export class Product extends React.Component {
    render() {
        return (
            <div className="Product">
                <img className="product_image" src={this.props.product.image} alt="Product" />
                
                <div className="product_title_div">
                    <p className="product_title">{this.props.product.name}</p>
                </div>
                
                <div className="prices">
                    <span className="actual_price">{this.props.product.current_price}</span>
                    <span className="old_price"><strike>{this.props.product.old_price}</strike></span>
                </div>
            </div>
        )
    }
}