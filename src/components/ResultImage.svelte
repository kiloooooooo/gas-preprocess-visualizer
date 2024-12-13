<script lang="ts">
    export let directory: FileSystemDirectoryHandle | undefined;
    export let kind: String;
</script>

{#if directory}
    <div style="width: 320px; height: 240px; background-color: gray;"></div>
{:else}
    <div style="width: 320px; height: 240px; background-color: red;"></div>
{/if}
