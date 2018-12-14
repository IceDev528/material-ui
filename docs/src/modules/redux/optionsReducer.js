import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => ({
    codeVariant: action.payload.codeVariant || state.codeVariant,
    userLanguage: action.payload.userLanguage || state.userLanguage,
  }),
};

const initialState = {
  codeVariant: CODE_VARIANTS.JS,
  userLanguage: 'en',
};

function optionsReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}

export default optionsReducer;
