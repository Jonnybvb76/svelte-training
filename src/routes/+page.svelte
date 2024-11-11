<script lang="ts">
    import steps from '$lib/steps.json';

    let step = $state(0);

    function increase() {
        if(steps.length -1 > step) {
            step++;
        }
    }

    function decrease() {
        if(step > 0) {
            step--;
        }
    }
</script>

<div class="task-container">
    <div class="title">{steps[step].title}</div>
    <div class="task">{@html steps[step].task}</div>
    <div class="references">
        {#each steps[step].references as reference}
            <a class="reference" href={reference} target="_blank" aria-label="reference link">{reference}</a>
        {/each}
    </div>
    <div class="buttons">
        {#if step != 0}
            <button onclick={decrease} class="back">back</button>
        {:else}
            <button onclick={decrease} class="back" disabled style="opacity: 0.4">back</button>
        {/if}
        {#if steps.length -1 > step}
            <button onclick={increase} class="next">next</button>
        {:else}
            <button onclick={increase} class="next" disabled style="opacity: 0.4">next</button>
        {/if}
    </div>
</div>

<style>
    .task-container {
        width: 500px;
        height: auto;
        background-color: rgb(51, 51, 62);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        padding: 15px;
    }

    .title {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 5px;
    }

    button {
        margin: 0;
        width: 60px;
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
    }

</style>