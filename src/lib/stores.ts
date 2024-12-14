import { type Writable, writable } from "svelte/store";

export type ImageType = {
    kind: String,
    processRange: number
};

export const sceneEntries: Writable<Array<FileSystemDirectoryHandle> | undefined> = writable(undefined);
export const imageType: Writable<ImageType> = writable({
    kind: "amp",
    processRange: 60
});
