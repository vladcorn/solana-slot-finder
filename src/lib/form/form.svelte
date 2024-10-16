<script lang="ts">
    import {Input} from "$lib/components/ui/input";
    import formStore, {updateFormValue} from "../../stores/form";
    import {timestampSchema} from './validation.schema'
    import {z} from "zod";
    import {Label} from "$lib/components/ui/label";


    const handleChanges = (e: any) => {
        try {

            timestampSchema.parse({
                year: Number($formStore.year),
                month: Number($formStore.month),
                day: Number($formStore.day),
                hour: Number($formStore.hour),
                minute: Number($formStore.minute),
                second: Number($formStore.second),
                [e.target.name]: Number(e.target.value)
            })
            updateFormValue(e.target.name, e.target.value);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Validation failed: ", error.issues[0]);
            } else {
                console.error("Unexpected error: ", error);

            }
        }
    }

</script>

<form class="flex gap-3 my-10">
    <div>
        <Label for="year">Year</Label>
        <Input type="number" min="2020" max={new Date().getFullYear()} on:change={handleChanges}
               bind:value={$formStore.year} name="year"/>
    </div>
    <div class="flex-1">
        <Label for="month">Month</Label>
        <Input type="number" max='12' min="1" on:change={handleChanges} bind:value={$formStore.month} name="month"/>
    </div>
    <div class="flex-1">
        <Label for="day">Day</Label>
        <Input type="number" max='31' min="1" on:change={handleChanges} bind:value={$formStore.day} name="day"/>
    </div>
    <div class="flex-1">
        <Label for="hour">Hour</Label>
        <Input type="number" max="23" min="0" on:change={handleChanges} bind:value={$formStore.hour} name="hour"/>
    </div>
    <div class="flex-1">
        <Label for="minute">Minute</Label>
        <Input type="number" max="59" min="0" on:change={handleChanges} bind:value={$formStore.minute} name="minute"/>
    </div>
    <div class="flex-1">
        <Label for="second">Second</Label>
        <Input type="number" max="59" min="0" on:change={handleChanges} bind:value={$formStore.second} name="second"/>
    </div>
</form>

