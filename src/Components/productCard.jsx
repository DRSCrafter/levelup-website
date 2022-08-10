import '../Styles/Components/productCard.css';
import React from 'react';
import {Button, IconButton, useMediaQuery} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function ProductCard({name, price, image, shadow=false}) {
    const data = {
        name: "Paper Mario the Origami King",
        price: "1,300,000",
        image: require('../Assets/product.png')
    }

    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <div className={`card-root ${shadow ? 'card-shadow' : ''}`}>
                <div className="card-container">
                    <img src={data.image} className="product-image" alt="product"/>
                    <div className="product-info">
                        <div className="product-name">{data.name}</div>
                        <div className="product-price">{data.price} تومان</div>
                        <div className="product-commands">
                            <IconButton style={{color: "#FF5D5D"}}>
                                <FavoriteBorderIcon htmlColor="#FF5D5D"/>
                            </IconButton>
                            {matches ?
                                <Button style={{borderRadius: 10, fontFamily: '"B Yekan", sans-serif', color: '#0080FF'}}
                                        variant="outlined"
                                        endIcon={<ShoppingCartOutlinedIcon style={{minWidth: 30}}/>}>خرید</Button>
                                : <IconButton style={{color: "#0080FF"}}>
                                    <ShoppingCartOutlinedIcon htmlColor="#0080FF"/>
                                </IconButton>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;