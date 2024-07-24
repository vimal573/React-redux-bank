import { type } from '@testing-library/user-event/dist/type';
import { createStore } from 'redux';

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
    case 'account/requestLoan':
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
store.dispatch({ type: 'account/withdrwan', payload: 200 });
console.log(store.getState());

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1300, loanPurpose: 'Buy a Car' },
});
console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
