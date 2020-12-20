<template>
  <div class="header">
    <div class="header-logo">
      <h1 class="header-logo-title">StructuriesApp</h1>
      <p class="header-logo-text">Тестовое задание для Аврора Холдинг</p>
    </div>
    <div class="header-navbar">
      <button
        type="button"
        class="btn btn-primary"
        v-modal-window="'mw-create-structure'"
      >
        Добавить структуру
      </button>

      <ModalWindowCreateStructure />
    </div>
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-logo {
    background-color: #f0f0f0;
    line-height: 1;
    text-align: center;
    border-radius: 15px;
    overflow: hidden;
    border: 3px solid #3636c5;
    background-color: #3636c5;

    &-title {
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 15px;
      padding-bottom: 15px;
      color: #fff;
      font-size: 33px;
    }
    &-text {
      margin-top: 0;
      margin-bottom: 0;
      padding: 12px 30px;
      background-color: #fff;
      font-size: 12px;
    }
  }
}
</style>
