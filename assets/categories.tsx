import { Category } from "./types/category";
import { PRODUCTS } from "./products";

export const CATEGORIES: Category[] = [
    {
        name: "Laptops",
        slug: "laptops",
        products: PRODUCTS.filter(
            product => product.category.slug === "laptops"
        )
    },
    {
        name: "Phones",
        slug: "phones",
        products: PRODUCTS.filter(product => product.category.slug === "phones")
    },
    {
        name: "Gaming",
        slug: "gaming",
        products: PRODUCTS.filter(product => product.category.slug === "gaming")
    },
    {
        name: "Accessories",
        slug: "accessories",
        products: PRODUCTS.filter(
            product => product.category.slug === "accessories"
        )
    }
];
