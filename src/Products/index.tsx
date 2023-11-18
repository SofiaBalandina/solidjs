import { useNavigate, useParams } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";

const fetcher = (categoryName: string) => {
    return fetch(`https://dummyjson.com/products/category/${categoryName}`)
    .then(res => res.json())
}

const Products = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log("params value", params.name);

    const [productData] = createResource(params.name, fetcher);

    return <div class=" w-3/4 mx-auto">
        <div class="p-2 flex justify-between">
            <span class="flex font-bold text-[22px]">{params.name}</span>
            <div class="p-2 flex gap-2">
                <span class="flex-1 p-2 font-bold text-[18px] cursor-pointer border border-black" onClick={() => navigate(-1)}>Back</span>
            </div>
        </div>
        <Show when={!productData.loading} fallback={<div>Loading...</div>}>
            <div class="grid grid-cols-3 gap-2">
                <For each={productData().products}>
                    {product => <div
                        class="min-h-[100px] border flex flex-col
                        bg-white shadow-sm cursor-pointer hover:border-gray-700" onClick={() => navigate(`/categories/${params.name}/products/${product.id}`)}>
                        <div class="p-2 border-b border-b-gray-500">{product.title}</div>
                        <img src={product.thumbnail} height={300} width={"100%"}/>
                    </div>}
                </For>
            </div>
        </Show>
    </div>
}

export default Products;