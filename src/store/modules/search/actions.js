export function getSearchRequest(type, params, id) {
  return {
    type: '@search/GET_SEARCH_REQUEST',
    payload: { type, params, id },
  };
}

export function getSearchSuccess(data) {
  return {
    type: '@search/GET_SEARCH_SUCCESS',
    payload: { data },
  };
}
