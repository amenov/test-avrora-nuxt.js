<template>
  <ModalWindow
    title="Изменить стуктуру"
    :id="'mw-update-structure-' + structure.id"
  >
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
      <div class="form-group">
        <label for="structure-persons">Кол-во сотрудников</label>
        <input
          type="number"
          name="persons"
          id="structure-persons"
          class="form-control"
          v-model.number="form.persons"
        />
      </div>
      <template v-if="flatStructuries.length">
        <div class="form-group">
          <label for="structure-parent">Родительская структура</label>
          <select
            name="parent"
            id="structure-parent"
            class="form-control"
            v-model.number="form.parentId"
          >
            <option :value="null">Не выбрано</option>
            <option
              :value="item.id"
              v-for="(item, index) in flatStructuries"
              :key="index"
            >
              {{ item.delimiter }}
              {{ item.name }}
            </option>
          </select>
        </div>
      </template>
      <button type="submit" class="btn btn-primary btn-block">
        Изменить
      </button>
    </form>
  </ModalWindow>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["structure"],
  data: () => ({
    form: {
      parentId: null,
      name: "",
      persons: 0
    }
  }),
  computed: {
    ...mapGetters({
      structuries: "structuries/structuries"
    }),
    flatStructuries() {
      return this.flat(this.structuries);
    }
  },
  methods: {
    ...mapActions({
      updateStructure: "structuries/updateStructure"
    }),
    flat(items) {
      items = items.filter(item => item.id !== this.structure.id);

      let final = [];

      items.forEach(item => {
        final.push(item);

        if (typeof item.children !== "undefined") {
          final = [...final, ...this.flat(item.children)];
        }
      });

      return final;
    },
    handler() {
      this.updateStructure(this.form);

      this.$modalWindow.hide("#mw-update-structure-" + this.structure.id);
    }
  },
  mounted() {
    this.form = { ...this.structure };
  }
};
</script>
