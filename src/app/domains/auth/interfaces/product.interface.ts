export interface Product {
    name: string,
    description: string,
    image: string,
    price: number,
    discount: number,
    stock: number
}

export interface ProductResponse {
    id: number
    name: string,
    description: string,
    image: string,
    price: number,
    discount: number,
    stock: number
}