export function discountPrice(item)
{
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}

export const API_URL = "http://localhost:5000/api/v1/"
