<script>
  import { responseData } from "../common";
  $: div =
    $responseData && ($responseData.isLoading || $responseData.hasLoaded) 
      ? "my-12 border rounded-md shadow-md px-6 pt-3 pb-6 text-xl"
      : "";
</script>

<div
  class={'my-12 px-6 pt-3 pb-6 text-xl' + div}
  aria-live="polite"
  aria-busy={$responseData.isLoading ? 'true' : 'false'}>
  {#if $responseData.isLoading}
    <p class="mt-2 mb-4">Loading...</p>
  {:else if !$responseData.foundUsers && $responseData.hasLoaded}
    <p class="mt-2 mb-4">No data found!</p>
    <a
      class="py-1 px-4 font-bold bg-black hover:bg-black border-black text-lg hover:bg-gray-800 hover:border-gray-800 text-sm border-4 text-white rounded"
      aria-label="OK"
      role="link"
      href="/">
      OK
    </a>
  {:else if !$responseData.isLoading && $responseData.data.length > 0}
    <p class="mt-2 mb-4">
      Users who live
      {$responseData.distance}
      miles from London are:
    </p>
    <ul class="my-6">
      {#each $responseData.data as { id, first_name, last_name, email }, i}
        <li {id}>{first_name} {last_name} - {email}</li>
      {/each}
    </ul>
    <a
      class="py-1 px-4 font-bold bg-black hover:bg-black border-black text-lg hover:bg-gray-800 hover:border-gray-800 text-sm border-4 text-white rounded"
      aria-label="Clear Results"
      role="link"
      href="/">
      Clear Results
    </a>
  {/if}
</div>
