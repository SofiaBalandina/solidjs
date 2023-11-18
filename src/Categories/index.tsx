import { useNavigate } from "@solidjs/router";
import { For, Show, createResource, onCleanup } from "solid-js"

const fetcher = () => {
    return fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
}

const Categories = () => {
    const [categoriesDataSet] = createResource(fetcher);
    const navigate = useNavigate();

    const clickHandler = (category: string) => {
        console.log("category", category);
        navigate(`/categories/${category}/products`);
    }

    onCleanup(() => {
        console.log("on Cleanup");
    })

   
    return <div class="p-2">
        <span class="text-[22px] font-bold">
            Categories
        </span>
        <Show when={!categoriesDataSet.loading} fallback={<div>Loading...</div>}>
            <div class="w-3/4 mx-auto my-2 grid grid-cols-3 gap-2">
                <For each={categoriesDataSet()}>
                    {category => <div onClick={[clickHandler, category]} class="cursor-pointer bg-white h-[150px] 
            flex justify-center items-center hover:border hover:border-black">
                        {category}
                    </div>}
                </For>
            </div>
        </Show>
    </div>

    
}

export default Categories