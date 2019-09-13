import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@qrcode/GET_QRCODE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@qrcode/GET_QRCODE_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
