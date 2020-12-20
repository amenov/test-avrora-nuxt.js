<template>
  <div class="table-structuries">
    <div class="table-structuries-header">
      <div>Название</div>
      <div>Общее кол-во</div>
      <div>Фактическое кол-во</div>
      <div>Кол-во вложенных элементов</div>
    </div>
    <template v-if="structuries.length">
      <Structuries :structuries="structuries" />
    </template>
    <template v-else>
      <div class="text-center">
        <span>Ничего не найдено</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      structuries: "structuries/structuries"
    })
  }
};
</script>

<style lang="scss">
.table-structuries {
  &-header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    > div {
      padding: 15px 0;
    }
  }
}
</style>
