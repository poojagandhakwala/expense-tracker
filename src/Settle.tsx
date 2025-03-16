import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import { useTab } from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense } from "./redux/Expense/ExpenseSlice";
import { selectBalances } from "./redux/Store";

const ExpenseShareApp = () => {
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];

  const [currency, setCurrency] = useState<string>("USD");
  const members = useSelector((state: any) => state.member.memberList);

  const dispatch = useDispatch();
  const { theme } = useTab();

  const expenses = useSelector(
    (state: { expense: { expenseList: any[] } }) => state.expense.expenseList
  );

  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    paidBy: 1,
    category: "food",
    splitWith: [1, 2, 3, 4],
    date: new Date().toISOString().split("T")[0],
  });
  //   const [activeTab, setActiveTab] = useState("expenses");

  // Categories with icons
  const categories = [
    { id: "food", name: "Food & Drinks", icon: "🍔" },
    { id: "transport", name: "Transportation", icon: "🚗" },
    { id: "accommodation", name: "Accommodation", icon: "🏠" },
    { id: "entertainment", name: "Entertainment", icon: "🎭" },
    { id: "shopping", name: "Shopping", icon: "🛍️" },
    { id: "other", name: "Other", icon: "📦" },
  ];

  // // Handle member selection for splitting
  // const handleMemberToggle = (memberId: number) => {
  //   const currentSplitWith = [...newExpense.splitWith];
  //   if (currentSplitWith.includes(memberId)) {
  //     // Remove if already selected
  //     setNewExpense({
  //       ...newExpense,
  //       splitWith: currentSplitWith.filter((id) => id !== memberId),
  //     });
  //   } else {
  //     // Add if not selected
  //     setNewExpense({
  //       ...newExpense,
  //       splitWith: [...currentSplitWith, memberId],
  //     });
  //   }
  // };

  // // Delete expense
  // const handleDeleteExpense = (id) => {
  //   dispatch(deleteExpense(id))
  //   // setExpenses(expenses.filter((expense) => expense.id !== id));
  // };

  // Generate settlement suggestions
  const generateSettlements = () => {
    const balances = useSelector(selectBalances);
    console.log(balances);
    const settlements = [];

    // Create arrays of debtors and creditors
    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .map(([id, balance]) => ({ id: parseInt(id), balance }))
      .sort((a, b) => a.balance - b.balance);

    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0)
      .map(([id, balance]) => ({ id: parseInt(id), balance }))
      .sort((a, b) => b.balance - a.balance);

    // Match debtors with creditors
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];

      // Get the minimum of the absolute values
      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

      if (amount > 0.01) {
        // Ignore very small amounts
        settlements.push({
          from: debtor.id,
          to: creditor.id,
          amount,
        });
      }

      // Update balances
      debtor.balance += amount;
      creditor.balance -= amount;

      // Remove settled parties
      if (Math.abs(debtor.balance) < 0.01) debtors.shift();
      if (Math.abs(creditor.balance) < 0.01) creditors.shift();
    }

    return settlements;
  };

  // Get currency symbol
  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === currency)?.symbol || "$";
  };

  // Format amount with currency
  const formatAmount = (amount: number) => {
    return `${getCurrencySymbol()}${amount.toFixed(2)}`;
  };

  // Get member name by ID
  const getMemberName = (id: number) => {
    return (
      members.find((member: { id: any }) => member.id === id)?.name || "Unknown"
    );
  };

  // Get category details
  const getCategory = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[5]; // Default to "Other"
  };

  return (
    <div className={`app ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Settlement Suggestions</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No expenses yet. Add expenses to see settlement suggestions.
          </p>
        ) : (
          <div>
            {generateSettlements().length === 0 ? (
              <p className="text-green-600 text-center py-4 font-medium">
                Everyone is settled up! No payments needed.
              </p>
            ) : (
              <div className="space-y-4">
                {generateSettlements().map((settlement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-800">
                        <span className="font-medium">
                          {getMemberName(settlement.from)}
                        </span>
                        <span className="mx-2 text-gray-500">pays</span>
                        <span className="font-medium">
                          {getMemberName(settlement.to)}
                        </span>
                      </div>
                      <span className="font-bold text-indigo-600">
                        {formatAmount(settlement.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseShareApp;
