<script lang="ts">
    import { imageType } from '$lib';

    export let directory: FileSystemDirectoryHandle | undefined;

    let imageFileUrl: string | undefined;
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

                const imageFile = await entry.getFile();
                const reader = new FileReader();

                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        imageFileUrl = reader.result;
                    }
                };

                if (imageFile) {
                    reader.readAsDataURL(imageFile);
                }
                break;
            }
        }
        console.log('complete');
    })();
</script>

<div class="p-1">
    {#if directory}
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img class="border border-black" src={imageFileUrl} alt="processed image" />
    {:else}
        <div class="flex items-center justify-center">
            <span>N/A</span>
        </div>
    {/if}
</div>
