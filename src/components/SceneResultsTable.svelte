<script lang="ts">
    import { sceneEntries } from '$lib';
    import { SceneParams } from '$lib/utils/SceneParams';
    import ResultImage from './ResultImage.svelte';

    $: scenesParamMap = new Map(
        $sceneEntries?.map((entry) => [SceneParams.parseDirName(entry.name).encodeString(), entry])
    );

    // 背景温度のパターンを抽出
    $: bgTempPatterns = [
        ...new Set(
            scenesParamMap
                ?.keys()
                .map((sceneParams) => SceneParams.decodeString(sceneParams).bgTemp)
        )
    ];
    // 流量のパターンを抽出
    $: flowPatterns = [
        ...new Set(
            scenesParamMap?.keys().map((sceneParams) => SceneParams.decodeString(sceneParams).flow)
        )
    ];
    // 撮影距離のパターンを抽出
    $: distancePatterns = [
        ...new Set(
            scenesParamMap
                ?.keys()
                .map((sceneParams) => SceneParams.decodeString(sceneParams).distance)
        )
    ];
</script>

{#if $sceneEntries != undefined}
    {#each bgTempPatterns as bgTemp}
        <h3 class="mb-4 mt-6 text-2xl">背面温度{bgTemp}</h3>
        <table class="table-auto border-collapse border border-black">
            <thead>
                <tr class="border-collapse border border-black">
                    <td class="border-collapse border border-black"></td>
                    {#each flowPatterns as flow}
                        <td class="border-collapse border border-black p-4">{flow}</td>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each distancePatterns as distance}
                    <tr class="border-collapse border">
                        <td class="border-collapse border border-black p-4">{distance}</td>
                        {#each flowPatterns as flow}
                            <td class="border-collapse border border-black">
                                <ResultImage
                                    directory={scenesParamMap.get(
                                        new SceneParams(distance, bgTemp, flow).encodeString()
                                    )}
                                />
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
{/if}
