<script lang="ts">
    import "./app.css";
    import {getBlockTime} from "./utils/get-block.util";
    import {Button} from "$lib/components/ui/button";
    import {Circle3} from 'svelte-loading-spinners';
    import {Form} from "$lib/form";
    import formStore from './stores/form'


    const knownBlock = 287043818;
    const knownBlockTime = new Date('2024-09-01T00:00:00.000Z').getTime() / 1000;

    let targetTime = new Date().getTime() / 1000;
    let blockToShow = knownBlock;
    let isFetching = false;
    let error: null | string = null;


    const handleClick = async () => {
        blockToShow = await getClosestBlock();
    }

    async function getClosestBlock() {
        isFetching = true;
        error = null;
        const targetDate = new Date();
        targetDate.setUTCFullYear($formStore.year);
        targetDate.setUTCMonth($formStore.month - 1);
        targetDate.setUTCDate($formStore.day);
        targetDate.setUTCHours($formStore.hour);
        targetDate.setUTCMinutes($formStore.minute);
        targetDate.setUTCSeconds($formStore.second);
        targetTime = parseInt(`${targetDate.getTime() / 1000}`, 10);
        console.log(targetTime);
        console.log(targetDate);


        if (isNaN(targetTime)) {
            isFetching = false;
            error = 'Invalid date';
            throw new Error('Invalid date');
        }


        if (targetTime > new Date().getTime() / 1000) {
            isFetching = false;
            error = 'Target time is in the future';
            throw new Error('Target time is in the future');
        } else if (Math.abs(knownBlockTime - targetTime) <= 10) {
            isFetching = false;
            error = null;
            return knownBlock;
        }

        let estimatedBlock = knownBlock;
        let estimatedBlockTime = knownBlockTime;
        do {

            if (targetTime < estimatedBlockTime) {
                estimatedBlock = estimatedBlock - Math.floor((estimatedBlockTime - targetTime) * 2.3);
            } else {
                estimatedBlock = Math.floor((targetTime - estimatedBlockTime) * 2.3) + estimatedBlock;
            }
            let blockTime = await getBlockTime(estimatedBlock);
            if (blockTime) {
                estimatedBlockTime = blockTime;
            } else {
                isFetching = false;
                error = 'Error fetching block time';
                throw new Error('Error fetching block time');
            }
        } while (estimatedBlockTime !== targetTime);

        isFetching = false;

        return estimatedBlock;
    }

</script>

<main class="flex align-middle column flex-col justify-center h-lvh bg-destructive-foreground w-full">
    <div class="container flex items-center column flex-col justify-center max-w-xl">
        {#if isFetching}
            <Circle3/>
        {:else}
            <h1 class="text-6xl font-bold accent-white">{error ?? blockToShow}</h1>
        {/if}
        <p class="my-5 text-center">
            I have limitations on how many requests I can make to the blockchain. For now i have 40k requests per day.
            Support me by donating to my address:
            <span class='text-lg'>EuHCvFCAc1zwUVU2mpdmMyLX1f2bDMQJs64f1xH2BT51</span>
        </p>
        <p class="my-2">
            Select date to get close slot for current date.
        </p>

        <Form/>

        <Button on:click="{handleClick}" class="w-full max-w-60">
            Get Closest Block
        </Button>
    </div>
</main>


<style>
</style>
