import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTab } from "./Context";

const Balances = () => {
  // const [expenses,setExpense]=useState([]);
  const expenses = useSelector(
    (state: { expense: { expenseList: any[] } }) => state.expense.expenseList
  );
  const members = useSelector((state: any) => state.member.memberList);
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];
  const {theme}=useTab();
  const [currency, setCurrency] = useState<string>("USD");

  // Calculate balances
  const calculateBalances = () => {
    const balances: { [key: number]: number } = {};

    // Initialize balances for all members
    members.forEach((member: any) => {
      balances[member.id] = 0;
    });

    // Calculate each expense's effect on balances
    expenses.forEach((expense) => {
      const paidBy = expense.paidBy;
      const splitWith = expense.splitWith;
      const amountPerPerson = expense.amount / splitWith.length;

      // Add the full amount to the person who paid
      balances[paidBy] += expense.amount;

      // Subtract the split amount from each person who's splitting
      splitWith.forEach((memberId: number) => {
        balances[memberId] -= amountPerPerson;
      });
    });

    return balances;
  };
  // Get member name by ID
  const getMemberName = (id: number) => {
    return members.find((member: { id: number; }) => member.id === id)?.name || "Unknown";
  };
  // Get currency symbol
  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === currency)?.symbol || "$";
  };

  // Format amount with currency
  const formatAmount = (amount: number) => {
    return `${getCurrencySymbol()}${amount.toFixed(2)}`;
  };

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Balances</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No expenses yet. Add expenses to see balances.
        </p>
      ) : (
        <div className="grid gap-4">
          {Object.entries(calculateBalances()).map(([memberId, balance]) => (
            <div
              key={memberId}
              className={`p-4 rounded-lg border ${
                balance > 0
                  ? "bg-green-50 border-green-200"
                  : balance < 0
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center text-gray-800">
                <span className="font-medium">
                  {getMemberName(parseInt(memberId))}
                </span>
                <span
                  className={`font-bold ${
                    balance > 0
                      ? "text-green-600"
                      : balance < 0
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {balance > 0 ? "+" : ""}
                  {formatAmount(balance)}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-800">
                {balance > 0
                  ? `is owed ${formatAmount(balance)}`
                  : balance < 0
                  ? `owes ${formatAmount(Math.abs(balance))}`
                  : "is settled up"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Balances;
