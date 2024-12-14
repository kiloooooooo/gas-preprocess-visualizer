<script lang="ts">
    import { imageType } from '$lib';

    export let directory: FileSystemDirectoryHandle | undefined;

    let imageFile: FileSystemFileHandle | undefined;
    $: (async () => {
        const procDir = await directory?.getDirectoryHandle($imageType.kind as string);
        if (!procDir || procDir.kind !== 'directory') {
            return;
        }

        for await (let [fileName, entry] of procDir) {
            if (fileName.match(new RegExp(`(${$imageType.processRange})(.\\w+$)`))) {
                if (entry.kind !== 'file') {
                    continue;
                }

                imageFile = entry;
                break;
            }
        }
        console.log('complete');
    })();
</script>

{#if directory}
    <div style="width: 320px; height: 240px; background-color: gray;">{imageFile?.name}</div>
{:else}
    <div style="width: 320px; height: 240px; background-color: red;">{imageFile?.name}</div>
{/if}
