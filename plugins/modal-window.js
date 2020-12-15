import Vue from "vue";

Vue.use({
  install(Vue) {
    Vue.prototype.$modal = {
      show(id) {
        document.querySelector(id).classList.add("modal-window--active");
      },
      hide(id) {
        document.querySelector(id).classList.remove("modal-window--active");
      }
    };
  }
});

Vue.directive("modal-window", {
  bind(el, binding, vnode) {
    el.onclick = function(e) {
      if (binding.value) {
        const mw = document.querySelector(`#${binding.value}`);

        if (mw) {
          document.body.appendChild(mw);
          setTimeout(() => mw.classList.add("modal-window--active"), 0);
        }
      }
    };
  }
});
