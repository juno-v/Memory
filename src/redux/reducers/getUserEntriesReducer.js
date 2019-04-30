const getUserEntries = (state = [], action) => {
    switch (action.type) {
      case 'SET_ENTRIES':
        return action.payload;
      default:
        return state;
    }
  };

  // logged in user's entries will be on the redux state at: 
  // state.getUserEntries
export default getUserEntries; 
