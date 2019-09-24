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

export function updateProfileRequest(data, id) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data, id },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
