<template>
  <ul>
    <Structure
      v-for="(structure, index) in structuries"
      :key="index"
      :structure="structure"
    />
  </ul>
</template>

<script>
export default {
  props: {
    structuries: {
      type: Array
    }
  }
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
