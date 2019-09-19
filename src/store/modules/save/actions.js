export function saveData(data) {
  return {
    type: '@save/SAVE',
    payload: { data },
  };
}
