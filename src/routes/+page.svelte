<script lang="ts">
    let length = $state(0);
    let weight = $state(0);
    let result = $state(0);

    function calculate() {
        result = weight / ((length) ** 2)
    }
</script>

<input bind:value={length} type="text" placeholder="Körpergröße"><br>
<input bind:value={weight} type="text" placeholder="Gewicht"><br>

<button onclick={calculate}>Berechnen</button>

<h1>{result}</h1>