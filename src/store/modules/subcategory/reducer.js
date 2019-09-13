import produce from 'immer';

const INITIAL_STATE = {
  data: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subcategory/GET_SUBCATEGORY_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@subcategory/GET_SUBCATEGORY_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@subcategory/CREATE_SUBCATEGORY_SUCCESS': {
        draft.data = [action.payload.data, ...draft.data];
        break;
      }

      default:
    }
  });
}
