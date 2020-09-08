<script>
  let fields = {
    distance: "",
  };

  let errors = {
    distance: "",
  };

  let formValid = false;

  async function handleSubmit(event) {
    formValid = true;

    if (fields.distance.trim().length === 0) {
      formValid = false;
      errors.distance = "This field is required";
    } else {
      errors.distance = "";
    }
  }

  async function handleReset() {
    fields.distance = "";
    errors.distance = "";
    formValid = false;
  }
</script>

<h1 class="mb-12 text-4xl">Distance Calculator</h1>
<form
  id="distance-calculator"
  name="distance-calculator"
  on:submit|preventDefault={handleSubmit}
  on:reset|preventDefault={handleReset} method="POST" action="/calculate">
  <div class="flex flex-wrap" novalidate>
    <div class="mb-6 w-full">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
        for="grid-password">
        <span class="">Distance</span>
      <input
      class="appearance-none block w-full bg-gray-200 text-gray-700 border
        border-gray-200 rounded py-3 px-4 my-3 leading-tight
        focus:outline-none focus:bg-white focus:border-gray-500 {errors.distance ? 'border-red-500' : ''}"
      id="distance"
      name="distance"
      type="text"
      bind:value={fields.distance}
      placeholder="e.g.: 20" />
      </label>
      {#if errors.distance}
        <p class="text-red-500 text-xs italic">{errors.distance}</p>
      {/if}
    </div>
    <div class="w-full">
      <button
        class="flex-shrink-0 bg-black hover:bg-black border-black
        hover:bg-gray-800 hover:border-gray-800   text-sm border-4 text-white py-1 px-2 rounded"
          aria-label="Calculate Distance"
        type="submit">
        Calculate Distance
      </button>
      <button
        class="flex-shrink-0 border-transparent border-4 text-black
          hover:text-gray-500 text-sm py-1 px-2 rounded"
          aria-label="Reset Form"
        type="reset">
        Reset Form
      </button>
    </div>
  </div>
</form>
