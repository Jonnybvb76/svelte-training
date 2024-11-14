<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    
    let ready = $state(false);
    onMount(() => ready = true);

    let step = $state(0);

    const progress = tweened(0, {
        duration: 400,
        easing: cubicOut
    });

    function increase() {
        if (data && data.data.length - 1 > step) {
            step++;
            progress.set(step / (data.data.length - 1));
        }
    }

    function decrease() {
        if (step > 0) {
            step--;
            progress.set(step / (data.data.length - 1));
        }
    }

    function removeProtocol(url: string): string {
        return url.replace(/^https?:\/\//, '');
    }

    let { data }: { data: PageData } = $props(); 
</script>

<div class="container">
    {#if ready}
    <div class="task-container" transition:fade>
        <div class="content">
            {#if data && data.data[step]}
                <div class="title">{data.data[step].title}</div>
                <div class="task">{@html data.data[step].task}</div>
                <div class="references">
                    {#each data.data[step].references as reference}
                        <a class="reference" href={reference} target="_blank" aria-label="reference link">{removeProtocol(reference)}</a>
                    {/each}
                </div>
            {:else}
                <div>No data available</div>
            {/if}
        </div>
        <div class="buttons">
            <button onclick={decrease} class="back" disabled={step === 0} style:opacity={step === 0 ? 0.4 : 1}>back</button>
            <button onclick={increase} class="next" disabled={step === data.data.length - 1} style:opacity={step === data.data.length - 1 ? 0.4 : 1}>next</button>
        </div>
    </div>
    <div class="progress-container">
        <progress value={$progress}></progress>
    </div>
    {/if}
</div>



<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 620px;
}

.task-container {
    width: clamp(200px, 85vw, 500px);
    background-color: rgb(51, 51, 62);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
}

.progress-container {
    width: clamp(200px, 85vw, 500px);
    margin-top: 10px;
}

progress {
    width: 100%;
    height: 10px;
    border-radius: 10px;
}

    .title {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 5px;
    }

    button {
        margin: 0;
        width: 60px;
        cursor:pointer;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        margin-top: 10px;
    }

    .references {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }

    .reference {
        height: 30px;
        background-color: #464656;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #9a9ac1;
        border-radius: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    progress {
        border-radius: 10px; 
        width: clamp(200px, 85vw, 500px);
        height: 10px;
        margin-top: 10px;
        background-color: rgb(72, 63, 90);
        border: none;
    }
    progress::-webkit-progress-bar {
        background-color: rgb(72, 63, 90);
        border-radius: 7px;
    }
    progress::-webkit-progress-value {
        background-color: rgb(175, 175, 230);
        border-radius: 7px;
    }

    ::-moz-progress-bar {
        background-color: rgb(175, 175, 230);
        border-radius: 7px;
    }


</style>