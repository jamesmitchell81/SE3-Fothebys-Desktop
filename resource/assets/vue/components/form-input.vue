<template id="fm-input-el">
  <span class="form-element">
    <label for="{{ input.id }}">{{ input.label }}</label>
    <span class="msg msg-error">{{ input.msg }}</span>
    <input type="text"
           name="{{ input.name }}"
           id="{{ input.id }}"
           placeholder="{{ input.placeholder }}"
           v-model="input.value"
           value="{{ input.value }}"
           @click="upcount(index)"
           @keyup.enter="getValue">
  </span>
</template>

<script>

</script>

<style>

</style>