import { createAction } from '@reduxjs/toolkit';

export const addExpense = createAction<{
  id: number;
  description: string;
  paidBy: number;
  category: string;
  amount: number;
  date: string;
}>('expense/addExpense'); 