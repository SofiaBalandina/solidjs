import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

const HomePage = () => {
    const navigate = useNavigate();
    onMount(() => {
        setTimeout(() => {
            navigate("/categories")
        }, 5000);
    })
    return <div class="flex h-screen justify-center items-center">
        <span class="text-[22px] font-bold">Welcome to Product Management Application... Please wait...</span>
    </div>
}

export default HomePage;