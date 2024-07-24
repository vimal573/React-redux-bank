const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdrwan':
      return { ...state, balance: state.balance - action.payload };
    case 'account/reaquestLoan':
      if (state.loan > 0) return;
      return { ...state, loan: action.payload };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: '',
      };
    default:
      return state;
  }
}
