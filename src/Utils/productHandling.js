import httpConnection from "./httpConnection";

export const getProducts = async (string, companies, isAvailable, category, sort) => {
    const reqBody = JSON.stringify({
        name: string,
        companies: companies,
        isAvailable: isAvailable,
        category: category,
        sort: sort
    });
    const resBody = await httpConnection.put(`/products/filter/`, reqBody, {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    return resBody.data;
};

export const getFullProduct = async (id, setProduct, setRelatedList) => {
    const item = await httpConnection.get(`/products/${id}`, {});
    setProduct(item.data);

    const request = JSON.stringify({
        type: item.data.type,
        category: item.data.category
    })
    const related = await httpConnection.put('/products/related', request, {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    });
    setRelatedList(related.data);
}

export const Like = async (user, handleUpdateUser, id) => {
    let likes = [...user.likes];

    if (user.likes.includes(id)) {
        const dislike = JSON.stringify({userID: user._id, isIncrement: false});
        try {
            likes = likes.filter(productID => productID !== id);
            await httpConnection.put(`/products/${id}/like`, dislike, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            likes.push(id);
        }
    } else {
        try {
            likes.push(id);
            const like = JSON.stringify({userID: user._id, isIncrement: true});
            await httpConnection.put(`/products/${id}/like`, like, {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });
        } catch (ex) {
            likes = likes.filter(productID => productID !== id);
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

        await httpConnection.post(`/users/${user._id}/order`, JSON.stringify({
            ...order,
            itemExists: itemExists
        }), {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

    } catch (ex) {
        handleUpdateUser('shoppingCart', backupCart);
    }
};