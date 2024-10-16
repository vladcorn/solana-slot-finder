import {writable} from "svelte/store";

const formStore = writable({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
});

export const updateFormValue = (key: string, value: number) => {
    formStore.update((f) => {
        // @ts-ignore
        f[key] = value;
        return f;
    });
}


export default formStore;
