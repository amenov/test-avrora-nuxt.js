<template>
  <li :id="'structure-' + structure.id">
    <div class="structure-row" :style="generateBgColor(structure.depth)">
      <div
        class="structure-col"
        :style="
          `margin-left: ${structure.depth > 1 ? structure.depth + '0' : '0'}px`
        "
      >
        <div v-if="structure.children.length" class="arrow-right">
          &#8250;
        </div>
        <span
          :style="
            `margin-left: ${
              !structure.children.length ? structure.depth + '0' : '0'
            }px`
          "
        >
          {{ structure.name }}
        </span>
      </div>
      <div class="structure-col">
        {{ structure.countPersons }}
      </div>
      <div class="structure-col ">
        {{ structure.persons }}
      </div>
      <div class="structure-col ">
        {{ structure.countNested }}
      </div>
      <div
        class="structure-col structure-col--actions"
        onclick="event.stopPropagation()"
      >
        <button
          class="btn btn-unstyled"
          v-modal-window="'mw-update-structure-' + structure.id"
        >
          <b-icon-pencil-fill />
        </button>
        <button class="btn btn-unstyled" @click="destroy">
          <b-icon-trash />
        </button>
      </div>
    </div>

    <ModalWindowUpdateStructure :structure="structure" />

    <Structuries
      v-if="structure.children.length"
      onclick="event.stopPropagation()"
      :structuries="structure.children"
    />
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["structure"],
  data: () => ({
    form: {}
  }),
  components: {
    Structuries: () => import("./Structuries"),
    ModalWindowUpdateStructure: () => import("./ModalWindowUpdateStructure")
  },
  methods: {
    ...mapActions({
      destroyStructure: "structuries/destroyStructure"
    }),
    generateBgColor(depth) {
      let alpha = 0;

      if (depth > 1) {
        if (depth < 10) alpha = `.${depth}`;
        else alpha = 1;
      }

      return `background-color: rgba(54, 54, 197, ${alpha})`;
    },

    destroy() {
      const yes = confirm("Вы действительно хотите удалить структуру?");

      if (yes) {
        this.destroyStructure(this.structure.id);
      }
    }
  },
  mounted() {
    document.getElementById(
      "structure-" + this.structure.id
    ).onclick = function() {
      this.classList.toggle("active");
    };

    this.form = {
      id: this.structure.id,
      name: this.structure.name,
      persons: this.structure.persons
    };
  }
};
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 9px;

  ul {
    margin-top: 9px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    height: 0;
  }

  .structure {
    &-row {
      padding: 15px;
      border: 1px solid #ddd;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      border-radius: 6px;
      transition: 0.3s;
      cursor: pointer;
      align-items: center;

      &:hover {
        transform: scale(1.015);
        box-shadow: 0 3px 15px rgba(#000, 0.06);
      }
    }

    &-col {
      display: flex;
      align-items: center;

      .arrow-right {
        margin-right: 12px;
        font-size: 21px;
        transition: 0.3s;
        position: relative;
        top: -2px;
      }

      &--actions {
        button + button {
          margin-left: 15px;
        }
      }
    }
  }

  &.active {
    > div > .structure-col {
      .arrow-right {
        transform: rotate(90deg);
      }
    }

    > ul {
      opacity: 1;
      visibility: visible;
      height: auto;
    }
  }
}
</style>
