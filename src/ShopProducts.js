import React from 'react';
import './ShopProducts.css';
import photo from './github_icon.png'
import { Product } from './Product.js'

export class ShopProducts extends React.Component {

    render() {
        let product_data = {
            name: "This is the product name",
            current_price: "$140",
            old_price: "$250",
            image: photo
        }

        return (
            <div id="to-center">
            <div id="product_list">
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
                <Product product={product_data}/>
            </div>
            </div>
        )
    }
}