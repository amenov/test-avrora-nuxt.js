<template>
  <form @submit.prevent="handler">
    <div class="form-group">
      <label for="structure-name">Название</label>
      <input
        type="text"
        name="name"
        id="structure-name"
        class="form-control"
        v-model.trim="form.name"
      />
    </div>
    <button type="submit" class="btn btn-primary btn-block">
      Добавить структуру
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      parentId: null,
      name: ""
    }
  }),
  methods: {
    ...mapActions({
      createStructure: "structuries/createStructure"
    }),
    handler() {
      if (!this.form.name) return;

      this.createStructure(this.form);

      this.form = { parentId: null, name: "" };
    }
  }
};
</script>

<style></style>
