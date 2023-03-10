export default interface Product {
    _id: string,
    name: string,
    company: string,
    category: String,
    type: String,
    productImage: string,
    thumbnailImage: string,
    price: number,
    description: string,
    details: { [x: string]: string },
    stock: number,
    likes: number,
    dateCreated: Date
}