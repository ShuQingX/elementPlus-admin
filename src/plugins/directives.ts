import { Directive, App } from 'vue';

const directives: Record<string, Directive> = {
  permission: {
    mounted(el: HTMLButtonElement, binding) {
      const { action, auths } = binding.value;
      if (!auths.includes(action)) {
        el.setAttribute('aria-disabled', 'true');
        el.classList.add('is-disabled');
      }
    }
  }
};

export function setupDirectives(app: App) {
  for (const key in directives) {
    app.directive(key, directives[key]);
  }
}
