<template>
  <li
    :id="'structure-' + structure.id"
    :class="'structure-depth--' + structure.depth"
  >
    <div class="structure-row">
      <div
        class="structure-col structure-col--name"
        :style="
          `margin-left: ${
            structure.depth !== 1 ? structure.depth + '5' : '0'
          }px`
        "
      >
        <div v-if="structure.children.length" class="arrow-right">
          &#8250;
        </div>
        <span
          :style="
            `margin-left: ${
              !structure.children.length ? structure.depth + '3' : '0'
            }px`
          "
        >
          {{ structure.name }}
        </span>
      </div>
      <div class="structure-col structure-col--count-persons">
        {{ structure.countPersons }}
      </div>
      <div class="structure-col structure-col--persons">
        {{ structure.persons }}
      </div>
      <div class="structure-col structure-col--count-nested">
        {{ structure.countNested }}
      </div>
    </div>

    <Structuries
      v-if="structure.children.length"
      onclick="event.stopPropagation()"
      :structuries="structure.children"
    />
  </li>
</template>

<script>
export default {
  props: ["structure"],
  components: {
    Structuries: () => import("./Structuries")
  },
  mounted() {
    document.getElementById(
      "structure-" + this.structure.id
    ).onclick = function() {
      this.classList.toggle("active");
    };
  }
};
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 9px;

  .structure {
    &-row {
      padding: 15px;
      border: 1px solid #ddd;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-radius: 6px;
      transition: 0.3s;
      cursor: pointer;
      align-items: center;

      &:hover {
        transform: scale(1.015);
        box-shadow: 0 3px 15px rgba(#000, 0.06);
      }
    }

    &-depth {
      &--2 {
        .structure-row {
          background-color: rgba(#3636c5, 0.2);
        }
      }
      &--3 {
        .structure-row {
          background-color: rgba(#3636c5, 0.4);
        }
      }
      &--4 {
        .structure-row {
          background-color: rgba(#3636c5, 0.6);
        }
      }
      &--5 {
        .structure-row {
          background-color: #3636c5;
        }
      }
    }
  }

  .structure-col {
    &--name {
      display: flex;
      align-items: center;

      .arrow-right {
        margin-right: 12px;
        font-size: 21px;
        transition: 0.3s;
        position: relative;
        top: -2px;
      }
    }
  }

  ul {
    margin-top: 9px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    height: 0;
  }

  &.active {
    > div > .structure-col {
      &--name {
        .arrow-right {
          transform: rotate(90deg);
        }
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
