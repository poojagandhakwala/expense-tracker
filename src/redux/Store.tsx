import { configureStore, createSelector } from "@reduxjs/toolkit";
import ExpenseReducer from "./Expense/ExpenseSlice";
import MemberReducer from "./Members/MemberSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, ExpenseReducer);
const store = configureStore({
  reducer: { expense: persistedReducer, member: MemberReducer },
});

// Selector to get expenses and members
const selectExpenses = (state: ReturnType<typeof store.getState>) =>
  state.expense;
const selectMembers = (state: ReturnType<typeof store.getState>) =>
  state.member;

interface Member {
  id: number;
  name: String;
}
interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: number;
  category: string;
  splitWith: number[];
  date: string;
}

export const selectBalances = createSelector(
  [selectExpenses, selectMembers],
  (expenses, members) => {
    const balances: { [key: number]: number } = {};

    members.memberList.forEach((member: Member) => {
      balances[member.id] = 0;
    });

    expenses.expenseList.forEach((expense: Expense) => {
      const paidBy = expense.paidBy;
      const splitWith = expense.splitWith;
      const amountPerPerson = expense.amount / splitWith.length;

      balances[paidBy] += expense.amount;

      splitWith.forEach((memberId: number) => {
        {
          console.log("member", balances[memberId]);
          balances[memberId] -= amountPerPerson;
        }
      });
    });

    return balances;
  }
);

export default store;
