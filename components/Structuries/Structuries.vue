<template>
  <ul>
    <Structure
      v-for="structure in structuries"
      :key="structure.id"
      :structure="structure"
    />
  </ul>
</template>

<script>
export default {
  props: ["structuries"]
};
</script>

<style lang="scss">
ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
