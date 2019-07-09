const getDate = (state = [], action) => {
    switch (action.type) {
      case 'SET_DATE':
        return action.payload;
      default:
        return state;
    }
  };

  // logged in user's entries will be on the redux state at: 
  // state.getDate
export default getDate; 