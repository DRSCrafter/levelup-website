import httpConnection from "./httpConnection";
const {apiEndpoint} = require('../config.json');

export const handleDeleteOrder = async (user, handleUpdateUser, order) => {
    const {productID, quantity} = order;

    let shoppingCart = [...user.shoppingCart];
    let backup = [...user.shoppingCart];

    try {
        const orderItem = shoppingCart.find((order) => order.productID == productID);
        const orderIndex = shoppingCart.indexOf(orderItem);
        shoppingCart.splice(orderIndex, 1);
        handleUpdateUser('shoppingCart', shoppingCart);

        const request = JSON.stringify({productID: productID, quantity: quantity});

        await httpConnection.put(`${apiEndpoint}${user._id}/order/delete`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

    } catch (ex) {
        handleUpdateUser('shoppingCart', backup);
    }
}