export interface CreateProductImage {
    imageUrl: string,
}

export interface CreateProductImageDto {
    imageUrl: string,
    productId: string
}

export interface UpdateProductImageDto {
    imageUrl: CreateProductImage,
    id: string
}