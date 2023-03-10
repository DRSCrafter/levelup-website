import httpConnection from "./http";
import User from "../types/context/user";
import Order from "../types/context/order";
import {StateEvolver} from "../types/global";

export const DeleteOrder = async (user: User, handleUpdateUser: StateEvolver, order: Order) => {
    const {productID, quantity} = order;

    let shoppingCart = [...user.shoppingCart];
    let backup = [...user.shoppingCart];

    try {
        const orderItem = shoppingCart.find((order) => order.productID == productID);
        const orderIndex = shoppingCart.indexOf(orderItem!);
        shoppingCart.splice(orderIndex, 1);
        handleUpdateUser('shoppingCart', shoppingCart);

        const request = JSON.stringify({productID: productID, quantity: quantity});

        await httpConnection.put(`/users/${user._id}/order/delete`, request, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

    } catch (ex) {
        handleUpdateUser('shoppingCart', backup);
    }
}