import Vue from "vue";

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
