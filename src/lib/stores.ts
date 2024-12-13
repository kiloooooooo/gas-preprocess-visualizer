import { type Writable, writable } from "svelte/store";

export const sceneEntries: Writable<Array<FileSystemDirectoryHandle> | undefined> = writable(undefined);
