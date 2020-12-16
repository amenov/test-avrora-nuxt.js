<template>
  <div class="container">
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="structuries-header">
          <div>Название</div>
          <div>Общее кол-во</div>
          <div>Фактическое кол-во</div>
          <div>Кол-во вложенных элементов</div>
        </div>
        <Structuries :structuries="structuries" />
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      structuries: "structuries/structuries"
    })
  }
};
</script>

<style lang="scss">
.structuries-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  > div {
    padding: 15px 0;
  }
}
</style>
