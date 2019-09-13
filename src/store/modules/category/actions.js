export function getCategoryRequest() {
  return {
    type: '@category/GET_CATEGORY_REQUEST',
    payload: {},
  };
}

export function getCategorySuccess(data) {
  return {
    type: '@category/GET_CATEGORY_SUCCESS',
    payload: { data },
  };
}

export function createCategoryRequest(name) {
  return {
    type: '@category/CREATE_CATEGORY_REQUEST',
    payload: { name },
  };
}

export function createCategorySuccess(data) {
  return {
    type: '@category/CREATE_CATEGORY_SUCCESS',
    payload: { data },
  };
}
