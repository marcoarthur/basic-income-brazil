<script>
  export let questions = [];
</script>

<div class="question-table-panel">
  <table>
    <tr>
      <th> Question </th>
      <th> Answer </th>
    </tr>
    {#each questions as q }
      <tr>
        <td>{q.text}</td>
        <td>{q.answer}</td>
      </tr>
    {/each}
  </table>
</div>
