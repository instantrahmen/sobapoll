export const bodyClass = (className: string) => {
  return function (node: HTMLElement, toggled: boolean) {
    node.classList.toggle(className, toggled);

    return {
      update(toggled: boolean) {
        node.classList.toggle(className, toggled);
      },
      destroy() {
        node.classList.remove(className);
      },
    };
  };
};

export const cssVariable = (variableName: string) => {
  return function (node: HTMLElement, value: string) {
    const important = 'important';
    node.style.setProperty(variableName, value, important);

    return {
      update(value: string) {
        node.style.setProperty(variableName, value, important);
      },
      destroy() {
        node.style.removeProperty(variableName);
      },
    };
  };
};

export default bodyClass;
