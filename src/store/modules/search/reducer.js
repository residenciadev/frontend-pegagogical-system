import produce from 'immer';

const INITIAL_STATE = {
  data: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@search/GET_SEARCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@search/GET_SEARCH_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
