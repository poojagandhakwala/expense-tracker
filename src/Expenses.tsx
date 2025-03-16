import  { useDeferredValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTab } from "./Context";
import { addExpense, deleteExpense } from "./redux/Expense/ExpenseSlice";

const Expenses = () => {
  const expenses = useSelector((state: any) => state.expense.expenseList);
  const dispatch = useDispatch();
  
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];

  const [currency, setCurrency] = useState<string>("USD");
  const members= useSelector((state:any)=>state.member.memberList)
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    paidBy: 1,
    category: "food",
    splitWith: [1, 2, 3, 4],
    date: new Date().toISOString().split("T")[0],
  });
  const categories = [
    { id: "food", name: "Food & Drinks", icon: "🍔" },
    { id: "transport", name: "Transportation", icon: "🚗" },
    { id: "accommodation", name: "Accommodation", icon: "🏠" },
    { id: "entertainment", name: "Entertainment", icon: "🎭" },
    { id: "shopping", name: "Shopping", icon: "🛍️" },
    { id: "other", name: "Other", icon: "📦" },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const processedVal=name==="paidBy"?Number(value):value;
    setNewExpense({ ...newExpense, [name]: processedVal });
  };

  const handleAddExpense = (e: any) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    
    const expenseToAdd = {
      id: Date.now(),
      // ...newExpense,
      description: newExpense.description,
      paidBy: newExpense.paidBy,
      category: newExpense.category,
      splitWith: newExpense.splitWith,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date || new Date().toISOString().split("T")[0],
    };
    console.log("ex=",expenseToAdd)
    dispatch(addExpense(expenseToAdd));
    // setExpenses([...expenses, expenseToAdd]);

    // Reset form
    setNewExpense({
      description: "",
      amount: "",
      paidBy: 1,
      category: "food",
      splitWith: [1, 2, 3, 4],
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleMemberToggle = (memberId: number) => {
    const currentSplitWith = [...newExpense.splitWith];
    if (currentSplitWith.includes(memberId)) {
      setNewExpense({
        ...newExpense,
        splitWith: currentSplitWith.filter((id) => id !== memberId),
      });
    } else {
      setNewExpense({
        ...newExpense,
        splitWith: [...currentSplitWith, memberId],
      });
    }
  };

  const handleDeleteExpense = (id: number) => {
    // setExpenses(expenses.filter((expense) => expense.id !== id));
    dispatch(deleteExpense(id));
  };

  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === currency)?.symbol || "$";
  };

   const formatAmount = (amount:number) => {
    return `${getCurrencySymbol()}${amount.toFixed(2)}`;
  };

  const getMemberName = (id:number) => {
    return members.find((member:any) => member.id === id)?.name || "Unknown";
  };

  const getCategory = (categoryId:string) => {
    return categories.find(cat => cat.id === categoryId) || categories[5]; 
  };

  // useEffect(()=>{
  //   if(theme==="dark"){
  //     let d=document.getElementsByClassName("bg-white");
  //     d.classList.add("")
  //   }
  // },[])


  return (
    <div className={`bg-primar`}>
      <div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Expense</h2>
          <form onSubmit={handleAddExpense} className="!text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 !justify-start">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                className="w-full p-2 !border !border-black rounded-md"
                  placeholder="What was it for?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {getCurrencySymbol()}
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-7 !border !border-black rounded-md"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paid By
                </label>
                <select
                  name="paidBy"
                  value={newExpense.paidBy}
                  onChange={handleInputChange}
                  className="w-full p-2 !border !border-black rounded-md"
                >
                  {members.map((member:any) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  className="w-full p-2 !border !border-black rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  className="w-full p-2 !border !border-black rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Split With
              </label>
              <div className="flex flex-wrap gap-2">
                {members.map((member:any) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleMemberToggle(member.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      newExpense.splitWith.includes(member.id)
                        ? "bg-indigo-100 text-indigo-800 border border-indigo-300"
                        : "bg-gray-100 text-gray-800 border border-gray-300"
                    }`}
                  >
                    {member.name}
                    {newExpense.splitWith.includes(member.id) ? " ✓" : ""}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full !bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Expenses List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No expenses yet. Add your first expense above!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paid By
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 !text-black">
                  {expenses.map((expense:any) => (
                    <tr key={expense.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {expense.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {formatAmount(expense.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getMemberName(expense.paidBy)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center">
                          <span className="mr-1">
                            {getCategory(expense.category).icon}
                          </span>
                          {getCategory(expense.category).name}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
