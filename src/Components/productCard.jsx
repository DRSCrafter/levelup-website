import '../Styles/Components/productCard.css';
import React from 'react';
import {Button, IconButton, useMediaQuery} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";


function ProductCard({info, shadow=false}) {
    const {name, price, thumbnailImage, stock} = info;

    const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <>
            <div className={`card-root ${shadow ? 'card-shadow' : ''}`}>
                <div className="card-container">
                    <img src={'http://localhost:3001/' + thumbnailImage} className="product-image" alt="product"/>
                    <div className="product-info">
                        <div className="product-name">{name}</div>
                        <div className="product-price">{stock !== 0 ? `${price} تومان` : 'ناموجود'}</div>
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