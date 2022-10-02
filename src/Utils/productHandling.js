import httpConnection from "./httpConnection";
const {apiEndpoint} = require('../config/config.json');

export const getProducts = async (string, companies, isAvailable, category, sort) => {
    const reqBody = JSON.stringify({
        name: string,
        companies: companies,
        isAvailable: isAvailable,
        category: category,
        sort: sort
    });
    const resBody = await httpConnection.put(`${apiEndpoint}/api/products/filter/`, reqBody, {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    return resBody.data;
};

export const Like = async (user, handleUpdateUser, id) => {
    let likes = [...user.likes];

    if (user.likes.includes(id)) {
        const dislike = JSON.stringify({userID: user._id, isIncrement: false});
        try {
            likes = likes.filter(productID => productID !== id);
            await httpConnection.put(`${apiEndpoint}/api/products/${id}/like`, dislike, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            likes.push(id);
            console.log(ex.response.message);
        }
    } else {
        try {
            likes.push(id);
            const like = JSON.stringify({userID: user._id, isIncrement: true});
            await httpConnection.put(`${apiEndpoint}/api/products/${id}/like`, like, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            likes = likes.filter(productID => productID !== id);
            console.log(ex.response.message);
        }
    }

    handleUpdateUser('likes', likes);
}

export const Buy = async (user, handleUpdateUser, info, quantity = 1) => {
    let shoppingCart = [...user.shoppingCart];
    let backupCart = [...user.shoppingCart];
    try {
        let orderIndex = -1;
        const order = {
            productID: info._id,
            name: info.name,
            quantity: quantity,
            totalPrice: info.price * quantity
        };

        const orderIDList = shoppingCart.map(item => item.productID);
        const itemExists = orderIDList.findIndex(productID => productID == info._id) !== -1;

        if (!itemExists) {
            shoppingCart.push(order);
        } else {
            orderIndex = shoppingCart.findIndex(item => item.productID === info._id);
            shoppingCart[orderIndex].quantity = shoppingCart[orderIndex].quantity + quantity;
            shoppingCart[orderIndex].totalPrice = shoppingCart[orderIndex].totalPrice + info.price * quantity;
        }
        handleUpdateUser('shoppingCart', shoppingCart);

        await httpConnection.post(`${apiEndpoint}/api/users/${user._id}/order`, JSON.stringify({
            ...order,
            itemExists: itemExists
        }), {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

    } catch (ex) {
        handleUpdateUser('shoppingCart', backupCart);
    }
};