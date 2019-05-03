const getKeywords = (state = [], action) => {
    switch (action.type) {
      case 'SET_KEYWORDS':
        return action.payload;
      default:
        return state;
    }
  };

  // logged in user's entries will be on the redux state at: 
  // state.getKeywordsReducer
export default getKeywords; 
