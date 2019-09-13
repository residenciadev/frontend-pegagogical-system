import produce from 'immer';

const INITIAL_STATE = {
  data: null,
  loading: false,
  ok: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@category/GET_CATEGORY_REQUEST': {
        draft.loading = true;
        break;
      }

      case 'persist/REHYDRATE': {
        draft.ok = true;
        break;
      }

      case '@category/GET_CATEGORY_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        break;
      }
      case '@category/CREATE_CATEGORY_SUCCESS': {
        draft.data = [action.payload.data, ...draft.data];
        break;
      }

      default:
    }
  });
}
