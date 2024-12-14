<script lang="ts">
    import ConfigSelector from '../components/ConfigSelector.svelte';
    import DirectoryPicker from '../components/DirectoryPicker.svelte';
    import SceneResultsTable from '../components/SceneResultsTable.svelte';
</script>

<div class="p-4">
    <h1 class="mb-4 mt-8 text-4xl">ガス前処理 結果をまとめて表示するやつ</h1>
    <p>ガスIR画像の前処理結果をまとめて表示します</p>

    <h2 class="mb-4 mt-8 text-3xl">ディレクトリを選択</h2>
    <p>表示対象の画像が含まれるディレクトリを選択します．</p>
    <div class="mt-4">
        <DirectoryPicker />
    </div>

    <h2 class="mb-4 mt-8 text-3xl">表示対象の選択</h2>
    <p>表示対象を選択します．処理に用いた画像数を指定します．</p>
    <div class="mt-4">
        <ConfigSelector />
    </div>

    <h2 class="mb-4 mt-8 text-3xl">結果一覧</h2>
    <div class="mt-4">
        <SceneResultsTable />
    </div>
</div>
