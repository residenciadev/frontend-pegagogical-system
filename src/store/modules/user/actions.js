export function getUserRequest() {
  return {
    type: '@user/GET_USER_REQUEST',
    payload: {},
  };
}

export function getUserSuccess(data) {
  return {
    type: '@user/GET_USER_SUCCESS',
    payload: { data },
  };
}
