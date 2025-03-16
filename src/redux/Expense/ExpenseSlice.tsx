import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface ExpenseItem{
  id:number,
  description: string,
  amount: number,
  paidBy: number,
  category: string,
  splitWith:number[],
  date: string,
}
const sampleList : ExpenseItem[]= [{
  id:Date.now(),
  description: "Dinner",
  amount: 120,
  paidBy: 1,
  category: "food",
  splitWith: [1, 2, 3, 4],
  date: new Date().toISOString().split("T")[0],
}];
const initialState = {
  // expenseList: [] as ExpenseItem[]
  expenseList: sampleList
};

const ExpenseSlice = createSlice({
  initialState,
  name: "Expense",
  reducers: {
    addExpense : (state: any, action: PayloadAction<ExpenseItem>) => {
      state.expenseList.push(action.payload)
    },
    deleteExpense:(state,action)=>{
      state.expenseList=state.expenseList.filter((expense)=>expense.id!==action.payload)
    },

    // reset:(state)=>{
    //   state.expenseList=sampleList
    // }
  },
});


export const {addExpense,deleteExpense}=ExpenseSlice.actions;
export default ExpenseSlice.reducer
