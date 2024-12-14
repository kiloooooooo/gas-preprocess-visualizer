<script lang="ts">
    import { imageType, sceneEntries } from '$lib';

    let procKinds: String[] = [];
    let rangeKinds: number[] = [];

    $: (async () => {
        if (!$sceneEntries) {
            return;
        }

        // とりあえず最初のシーンをサンプルとして取ってくる
        const sampleScene = $sceneEntries?.[0];
        let _procKinds: Set<String> = new Set();
        let _rangeKinds: Set<number> = new Set();

        for await (let [procKind, procEntry] of sampleScene?.entries()) {
            if (procEntry.kind !== 'directory') {
                continue;
            }

            if (procEntry.name.startsWith('original')) {
                continue;
            }

            _procKinds.add(procKind);

            for await (let [fileName, rangeEntry] of procEntry.entries()) {
                if (rangeEntry.kind !== 'file') {
                    continue;
                }
                const match = fileName.match(/(\d+)(\.\w+)$/);
                const rangeKind = match ? Number(match[1]) : null;
                if (rangeKind) {
                    _rangeKinds.add(rangeKind);
                }
            }
        }

        procKinds = [..._procKinds];
        rangeKinds = [..._rangeKinds].toSorted((a, b) => a - b); // Array.toSorted()は引数を省略すると文字列としてソートするらしい
    })();

    function onProcKindInput(event: Event) {
        const { target } = event;

        if (!(target instanceof HTMLSelectElement)) {
            return;
        }

        $imageType = {
            ...$imageType,
            kind: target.value
        };
    }

    function onRangeKindInput(event: Event) {
        const { target } = event;

        if (!(target instanceof HTMLSelectElement)) {
            return;
        }

        $imageType = {
            ...$imageType,
            processRange: Number(target.value.slice(0, -1))
        };
    }
</script>

<div>
    <h3 class="mb-4 mt-8 text-xl">処理の種類</h3>
    <p>"amp"，"phase"等，各シーンのディレクトリ直下にあるディレクトリ名を指定します．</p>
    <select class="mt-4 border-2 p-2" on:input={onProcKindInput}>
        {#each procKinds as procKind}
            <option>{procKind}</option>
        {/each}
    </select>
    <h3 class="mb-4 mt-8 text-xl">処理枚数</h3>
    <p>処理に使用した画像枚数を指定します．</p>
    <select class="mt-4 border-2 p-2" on:input={onRangeKindInput}>
        {#each rangeKinds as rangeKind}
            <option>{rangeKind}枚</option>
        {/each}
    </select>
</div>
