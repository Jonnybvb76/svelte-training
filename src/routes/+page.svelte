<script lang="ts">
    import steps from '$lib/steps.json';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let ready = $state(false);
    onMount(() => ready = true);

    function redirectToDynamicResource(module: string) {
        goto(`/module/${module}`);
    }
</script>

<div class="container">
    {#each steps as module}
        {#if ready} 
        <button transition:fade  class="module" onclick={() => redirectToDynamicResource(module.title.replace(/ /g, "-"))} aria-label="Modul: {module.title}">
            <div class="title">{module.title}</div>
            <div class="description">{module.description}</div>
            <div class="count">{module.steps.length} Schritte in diesem Modul</div>
        </button>
        {/if}
    {/each}
</div>

<style>

    .container {
        margin-top: 10px;
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .module {
        text-decoration: none;
        color: white;
        background-color: rgb(51, 51, 62);
        width: clamp(300px, 50vw, 800px);
        display: flex;
        flex-direction: column;
        text-align: left;

    }

    .module .title {
        font-weight: 600;
        font-size: 16px;
    }

    .module .count {
        margin-top: 5px;
        font-style: italic;
        opacity: 0.8;
    }
</style>