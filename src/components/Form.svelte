<script>
  import { responseData, GetDistanceFromCoords, GetUserData } from "../common";

  let fields = {
    distance: "",
  };

  let errors = {
    distance: "",
  };

  let formValid = false;

  const fetchUsers = (distance) => {
    const payload = {
      distance,
    };

    let userData = GetUserData(payload);

    userData.then((data) => {
      responseData.update((d) => {
        return {
          data,
          distance,
          foundUsers: data.length > 0,
          hasLoaded: true,
          isLoading: false,
        };
      });
    });
  };

  async function handleSubmit(event) {
    formValid = true;
    const { distance } = fields;
    if (distance.trim().length === 0) {
      formValid = false;
      errors.distance = "This field is required";
    } else {
      if (isNaN(distance)) {
        formValid = false;
        errors.distance = "Distance should be numbers only";
      } else {
        responseData.update((d) => {
          return {
            ...d,
            isLoading: true,
          };
        });
        const distance = Number.parseFloat(fields.distance);
        fetchUsers(distance);
        errors.distance = "";
      }
    }
  }

  async function handleReset() {
    fields.distance = "";
    errors.distance = "";
    formValid = false;
    responseData.set({
      data: [],
      foundUsers: false,
      hasLoaded: false,
      isLoading: false,
      distance: 0,
    });
  }
</script>

<h1 class="mb-12 text-4xl">Distance Calculator</h1>
<form
  id="distance-calculator"
  name="distance-calculator"
  on:submit|preventDefault={handleSubmit}
  on:reset|preventDefault={handleReset}
  method="POST"
  action="/calculate">
  <div class="flex flex-wrap" novalidate>
    <div class="mb-6 w-full">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
        for="grid-password">
        <span class="">Distance</span>
        <input
          class="appearance-none block w-full bg-gray-100 text-gray-700 border
            border-gray-500 rounded py-3 px-4 my-3 leading-tight
            focus:outline-none focus:bg-white focus:border-gray-700 {errors.distance ? 'border-red-700' : ''}"
          id="distance"
          name="distance"
          type="text"
          bind:value={fields.distance}
          placeholder="Distance (in miles) e.g.: 20" />
      </label>
      {#if errors.distance}
        <p class="text-red-700 text-xs italic">{errors.distance}</p>
      {/if}
    </div>
    <div class="w-full">
      <button
        class="flex-shrink-0 bg-black hover:bg-black border-black
          hover:bg-gray-800 hover:border-gray-800 text-sm border-4 text-white
          py-1 px-2 rounded"
        aria-label="Calculate Distance"
        type="submit">
        Calculate Distance
      </button>
      <button
        class="flex-shrink-0 border-transparent border-4 text-black
          hover:text-gray-500 text-sm py-1 px-2 rounded"
        aria-label="Reset Form"
        type="reset">
        {$responseData.foundUsers && $responseData.hasLoaded ? 'Clear Results' : 'Reset Form'}
      </button>
    </div>
  </div>
</form>
