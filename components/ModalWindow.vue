<template>
  <div class="modal-window" :id="id" @click="$modal.hide(`#${id}`)">
    <div class="modal-window-inner" @click.stop>
      <div class="modal-window-header">
        <div class="modal-window-header-title">{{ title }}</div>
        <div class="modal-window-header-close" @click="$modal.hide(`#${id}`)">
          <span>&times;</span>
        </div>
      </div>
      <div class="modal-window-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "id"]
};
</script>

<style lang="scss">
.modal-window {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(#000, 0.45);
  opacity: 0;
  visibility: hidden;
  transition: 0.45s;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 21px 15px;
    border-bottom: 1px solid #ddd;

    &-title {
      font-weight: 500;
      font-size: 21px;
    }

    &-close {
      background-color: red;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
    }
  }

  &-inner {
    position: fixed;
    width: 600px;
    background-color: #fff;
    top: 0;
    transition: 0.45s;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
  }

  &-content {
    padding: 21px 15px;
  }

  &--active {
    opacity: 1;
    visibility: visible;
  }

  &--active &-inner {
    top: 150px;
  }
}
</style>
