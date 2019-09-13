export function getSubcategoryRequest(id) {
  return {
    type: '@subcategory/GET_SUBCATEGORY_REQUEST',
    payload: { id },
  };
}

export function getSubcategorySuccess(data) {
  return {
    type: '@subcategory/GET_SUBCATEGORY_SUCCESS',
    payload: { data },
  };
}

export function createSubcategoryRequest(name, categoryId) {
  return {
    type: '@subcategory/CREATE_SUBCATEGORY_REQUEST',
    payload: { name, categoryId },
  };
}

export function createSubcategorySuccess(data) {
  return {
    type: '@subcategory/CREATE_SUBCATEGORY_SUCCESS',
    payload: { data },
  };
}
