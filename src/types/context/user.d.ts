export interface Order {
    productID: string,
    name: string,
    date?: any;
    dateBought?: string,
    quantity: number,
    totalPrice: number
}

export default interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    account: number,
    userImage: any;
    likes: string[],
    shoppingCart: Order[],
    order: Order[]
}