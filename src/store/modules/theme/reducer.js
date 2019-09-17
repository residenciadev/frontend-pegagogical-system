import produce from 'immer';

const INITIAL_STATE = {
  theme: 'light',
};

export default function theme(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@theme/CHANGE_THEME_REQUEST':
      return produce(state, draft => {
        if (draft.theme === 'light') {
          draft.theme = 'dark';
        } else {
          draft.theme = 'light';
        }
      });

    default:
      return state;
  }
}
