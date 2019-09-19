import produce from 'immer';

const INITIAL_STATE = {
  save: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@save/SAVE':
      return produce(state, draft => {
        console.log(action.payload.data);
        draft.save = action.payload.data;
      });

    default:
      return state;
  }
}
