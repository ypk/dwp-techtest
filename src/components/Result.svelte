<script>
  import { responseData } from "../common";
</script>

<div class="my-12">
  {#if $responseData.isLoading}
    <p>Loading...</p>
  {:else if !$responseData.foundUsers && $responseData.hasLoaded }
    <p>No data found!</p>
  {:else if !$responseData.isLoading && $responseData.data.length > 0}
    <p>Users who live {$responseData.distance} miles from London are:</p>
    <ul class="my-6">
      {#each $responseData.data as { id, first_name, last_name, email }, i}
        <li {id}>{first_name} {last_name} - {email}</li>
      {/each}
    </ul>
  {/if}
</div>