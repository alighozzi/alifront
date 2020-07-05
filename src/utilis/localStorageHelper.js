export async function setItem(key, value) {
  try {
    await window.localStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
}

export function getItem(key) {
  try {
    const itemString = window.localStorage.getItem(key);
    return itemString;
  } catch (e) {
    throw e;
  }
}
