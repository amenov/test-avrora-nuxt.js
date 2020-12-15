import Vue from "vue";

Vue.use({
  install(Vue) {
    Vue.prototype.$modal = {
      hide(id) {
        document.querySelector(id).classList.remove("modal-window--active");

        // setTimeout(() => {
        //   document.querySelector(id).remove();
        // }, 300);
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
