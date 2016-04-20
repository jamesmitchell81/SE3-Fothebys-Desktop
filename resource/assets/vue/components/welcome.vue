<template>

  <div class="actions">
    <h1>Actions</h1>

      <div class="page-notification" v-if="actions.length === 0">
        You have no current actions
      </div>

  </div>


</template>
<script>

export default {
  name: 'Welcome',

  data: function() {
    return {
      actions: []
    }
  }
}

</script>