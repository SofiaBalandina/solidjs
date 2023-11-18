import { useNavigate, useParams } from "@solidjs/router";
import { Show, createMemo, createResource } from "solid-js";

const fetchProductData = (productId: string) => {
    return fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
}

const Product = () => {
    console.log("Product")
    const params = useParams();
    const productId = createMemo(() => params.productName);
    const navigate = useNavigate();

    const [productData, {mutate, refetch}] = createResource(productId, fetchProductData);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`https://dummyjson.com/products/${productId()}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: e.target.description.value,
                price: e.target.price.value,
                discountPercentage: e.target.discountPercentage.value,
                stock: e.target.stock.value
            })
        }).then(res => res.json())
        .then(res => refetch());
    }

    return <div>
        <Show when={!productData.loading} fallback={<div>Loading...</div>}>
            <form onSubmit={handleSubmit}>
                <div class="min-h-[400px] border flex flex-col
                        bg-white shadow-sm w-1/2 mx-auto p-4">
                    <span class="font-bold text-[22px] p-2">{productData().title} - {productData().brand}</span>

                    <div class={"flex flex-col p-2"}>
                        <label class="font-bold">Description</label>
                        <textarea class="p-1 border border-black" rows={4} value={productData().description} name="description"/>
                    </div>
                    <div class={"flex flex-col p-2"}>
                        <label class="font-bold">Price</label>
                        <input type="number" class="p-1 border border-black" value={productData().price} name="price"/>
                    </div>
                    <div class={"flex flex-col p-2"}>
                        <label class="font-bold">Discount Percentage</label>
                        <input type="number" step={"any"} class="p-1 border border-black" value={productData().discountPercentage} name="discountPercentage"/>
                    </div>
                    <div class={"flex flex-col p-2"}>
                        <label class="font-bold">Stock</label>
                        <input type="number" class="p-1 border border-black" value={productData().stock} name="stock"/>
                    </div>
                    <div class="border-t border-t-gray-300 p-2 flex gap-2 justify-end">
                        <button class="bg-blue-700 text-white p-1 rounded" type="submit">Submit</button>
                        <button class="bg-red-700 text-white p-1 rounded" type="button" onClick={() => navigate(`/category/${params.name}`)}>Cancel</button>
                    </div>
                </div>
            </form>
        </Show>
    </div>
}

export default Product;