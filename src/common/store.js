import { writable } from "svelte/store";

export const responseData = writable({
    data: [],
    foundUsers: false,
    hasLoaded: false,
    isLoading: false,
    distance: 0
});
