<template>
  <ModalWindow title="Добавить стуктуру" id="mw-create-structure">
    <form @submit.prevent="handler">
      <div class="form-group" :class="{ 'form-group--error': errors.name }">
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
      <button type="submit" class="btn btn-primary btn-block">
        Добавить структуру
      </button>
    </form>
  </ModalWindow>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    initialForm: {
      parentId: null,
      name: "",
      persons: 0
    },
    form: {},
    errors: {}
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
      createStructure: "structuries/createStructure"
    }),
    bootstrap() {
      this.form = { ...this.initialForm };
    },
    flat(items) {
      var final = [];
      var self = this;
      items.forEach(function(item) {
        final.push(item);

        if (typeof item.children !== undefined) {
          final = final.concat(self.flat(item.children));
        }
      });

      return final;
    },
    handler() {
      this.errors = {};

      if (!this.form.name) {
        alert('Пожалуйста заполните поле "Название"!');

        this.errors.name = true;

        return;
      }

      if (this.form.persons === "") {
        this.form.persons = 0;
      }

      this.createStructure(this.form);

      this.$modalWindow.hide("#mw-create-structure");

      this.bootstrap();
    }
  },
  mounted() {
    this.bootstrap();
  }
};
</script>
