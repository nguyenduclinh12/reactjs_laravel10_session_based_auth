// local store & session store
export const inStore = (name, value, remember = false) =>
  remember
    ? localStorage.setItem(name, value)
    : sessionStorage.setItem(name, value);

export const fromStore = (name) =>
  localStorage.getItem(name) || sessionStorage.getItem(name);

export const removeStorage = (name) => {
  localStorage.removeItem(name);
  sessionStorage.removeItem(name);
};
