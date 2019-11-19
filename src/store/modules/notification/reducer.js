import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: true,
};

export default function notification(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@notification/GET_NOTIFICATION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@notification/GET_NOTIFICATION_SUCCESS': {
        draft.data = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@notification/NOTIFICATION_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
