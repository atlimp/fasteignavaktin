import { writable } from "svelte/store";

export const pageNo = writable(1);
export const hasMoreProperties = writable(true);