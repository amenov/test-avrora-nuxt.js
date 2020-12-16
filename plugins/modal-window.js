import Vue from "vue";

Vue.use({
  install(Vue) {
    Vue.prototype.$modalWindow = {
      hide(id) {
        const mw = document.querySelector(id);

        const activeClass = "modal-window--active";

        if (mw.classList.contains(activeClass)) {
          mw.classList.remove(activeClass);
        }
      }
    };
  }
});

Vue.directive("modal-window", {
  bind(el, binding, vnode) {
    el.onclick = function(e) {
      if (binding.value) {
        e.stopPropagation();

        const mw = document.querySelector(`#${binding.value}`);

        const activeClass = "modal-window--active";

        if (mw && !mw.classList.contains(activeClass)) {
          mw.classList.add(activeClass);
        }
      }
    };
  }
});
