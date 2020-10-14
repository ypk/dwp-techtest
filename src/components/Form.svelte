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

<h1 class="mb-4 text-4xl md:mb-12 md:text-6xl leading-tight">
  Distance Calculator
</h1>
<div class="mb-6 text-lg md:mb-12 md:text-xl">
  <p class="py-2 leading-loose">
    This form fetches a list of users from a specific API and displays who live
    within a
    <br />user-specified distance from
    <span
      class="text-white leading-none cursor-text font-semibold bg-gray-800 rounded px-2 py-1"
      title="<%-'Latitude: '+initialCoords.latitude+', Longitude: '+initialCoords.longitude %>">London
      City</span>
  </p>
  <p class="py-2" id="role-help">
    Please enter the radius in miles to begin the search
  </p>
</div>
<form
  id="distance-calculator"
  name="distance-calculator"
  on:submit|preventDefault={handleSubmit}
  on:reset|preventDefault={handleReset}
  novalidate>
  <div class="flex flex-wrap">
    <div class="mb-6 md:mb-12 w-full">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="distance">
        <span class="text-sm font-normal md:text-lg">Distance</span>
        <input
          class="appearance-none block w-full bg-gray-100 text-gray-700 border
          border-gray-500 rounded py-3 px-4 my-3 text-lg leading-tight focus:outline-none
          focus:bg-white focus:border-gray-700 {errors.distance ? 'border-red-700' : ''}"
          id="distance"
          name="distance"
          type="text"
          bind:value={fields.distance}
          aria-describedby="role-help"
          placeholder="Distance (in miles) e.g.: 20" />
      </label>
      {#if errors.distance}
        <p aria-live="polite" class="text-red-700 text-lg md:text-xl italic">
          {errors.distance}
        </p>
      {/if}
    </div>
    <div class="w-full flex flex-col md:flex-row">
      <button
        class="font-bold bg-black hover:bg-black border-black text-lg hover:bg-gray-800 hover:border-gray-800 text-sm border-4 text-white py-1 px-4 rounded mb-6 md:mb-auto"
        aria-label="Calculate Distance"
        role="button"
        type="submit">
        Calculate Distance
      </button>
      <button
        class="flex-shrink-0 font-bold border-transparent border-4 text-black text-lg hover:text-gray-500 text-sm py-1 px-4 rounded"
        aria-label="Reset Form"
        role="button"
        type="reset">
        {$responseData.foundUsers && $responseData.hasLoaded ? 'Clear Results' : 'Reset Form'}
      </button>
    </div>
  </div>
</form>
