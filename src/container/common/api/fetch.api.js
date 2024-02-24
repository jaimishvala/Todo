import { addRequest, deleteRequest, getRequest, updateRequest } from "./request"

export const getProductsData = () => {
    return getRequest('fetch/')
}

export const addProductsData = (data) => {
    return addRequest('fetch/', data)
}

export const deleteProductsData = (id) => {
    return deleteRequest('fetch/', id)
}

export const updateProductsData = (data) => {
    return updateRequest('fetch/', data)
}