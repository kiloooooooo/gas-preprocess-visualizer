<script lang="ts">
    import { sceneEntries } from '$lib';

    let directoryHandle: FileSystemDirectoryHandle | undefined;

    async function onButtonClick() {
        if (!window.showDirectoryPicker) {
            alert('window.showDirectoryPickerが使用できません');
            return;
        }

        directoryHandle = await window.showDirectoryPicker();
        if (!directoryHandle) {
            alert('window.showDirectoryPickerがundefinedを返しました．ディレクトリを開けません');
            return;
        }

        // baseDirectoryHandler.set(directoryHandle);
        let directories = [];
        for await (let entry of directoryHandle.values()) {
            if (entry.kind === 'directory') {
                directories.push(entry);
            }
        }
        sceneEntries.set(directories);
    }
</script>

<div class="flex items-center gap-x-4">
    <button
        class="border-2 p-2 transition hover:border-blue-700 hover:bg-blue-500 hover:text-white"
        on:click={onButtonClick}
    >
        ディレクトリを開く
    </button>
    {#if directoryHandle}
        <p>開いたディレクトリ: {directoryHandle.name}</p>
    {/if}
</div>
