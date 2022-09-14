import '../Styles/Components/productCard.css';
import React, {useContext} from 'react';
import UserContext from "../Context/userContext";

import {Button, IconButton, useMediaQuery} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";

function ProductCard({info, onBuy, onLike, shadow = false}) {
    const {_id, name, price, thumbnailImage, stock} = info;
    const {user, handleUpdateUser} = useContext(UserContext);

    const matches = useMediaQuery('(min-width: 1024px)');
    const navigate = useNavigate();

    const handleClick = () => navigate(`../products/${_id}`);

    const isAvailable = stock !== 0;

    return (
        <>
            <div className={`card-root ${shadow ? 'card-shadow' : ''}`} onClick={handleClick}>
                <div className="card-container">
                    <img src={'http://localhost:3001/' + thumbnailImage} className="product-image" alt="product"/>
                    <div className="product-info">
                        <div className="product-name">{name}</div>
                        <div
                            className={`product-price ${!isAvailable ? "text-danger" : ''}`}>{isAvailable ? `${price} تومان` : 'ناموجود'}
                        </div>
                        <div className="product-commands">
                            <Checkbox style={{color: "#FF5D5D"}} icon={<FavoriteBorder htmlColor="#FF5D5D"/>}
                                      checkedIcon={<Favorite htmlColor="#FF5D5D"/>}
                                      checked={user && user.likes.includes(_id)}
                                      onClick={(event) => onLike(event, user, handleUpdateUser, _id)}/>
                            {matches ?
                                <Button
                                    style={{borderRadius: 10, fontFamily: '"B Yekan", sans-serif', color: '#0080FF'}}
                                    variant="outlined"
                                    endIcon={<ShoppingCartOutlinedIcon style={{minWidth: 30}}/>}
                                    onClick={() => onBuy(user, handleUpdateUser, info)}
                                    disabled={!isAvailable}>خرید</Button>
                                : <IconButton style={{color: "#0080FF"}} onClick={(event) => onBuy(event, info)}>
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