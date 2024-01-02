export interface UserAddress {
    id: string,
    houseNumber: string,
    street: string,
    postCode: string,
    city: string,
    country: string
    userId: string
}

export interface CreateAddress {
    houseNumber: string,
    street: string,
    postCode: string,
    city: string,
    country: string
}