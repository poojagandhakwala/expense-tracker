import { useMyContext } from "./Context/ThemeContext.tsx";

const Tabs = () => {
  const { activeTab, setActiveTab } = useMyContext();

  return (
    <div className="flex mb-6 gap-2">
      <button
        className={`py-2 px-4 font-medium !outline-none rounded-lg px-3 py-2 text-sm bg-[#f9f9f9] cursor-pointer dark:bg-gray-600 ${
          activeTab === "expenses"
            ? "text-indigo-600 dark:text-indigo-300 border !border-b-2 border-indigo-600 text-indigo-600"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 text-indigo-600"
        }`}
        // border-indigo-600
        onClick={() => setActiveTab("expenses")}
      >
        Expenses
      </button>
      <button
        className={`py-2 px-4 font-medium !outline-none rounded-lg px-3 py-2 text-sm bg-[#f9f9f9] cursor-pointer dark:bg-gray-600  ${
          activeTab === "balances"
            ? "text-indigo-600 dark:text-indigo-300 border !border-b-2 border-indigo-600 text-indigo-600"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 text-indigo-600"
        }`}
        onClick={() => setActiveTab("balances")}
      >
        Balances
      </button>
      <button
        className={`py-2 px-4 font-medium  !outline-none rounded-lg  px-3 py-2 text-sm bg-[#f9f9f9] cursor-pointer dark:bg-gray-600 ${
          activeTab === "settle"
            ? "text-indigo-600 dark:text-indigo-300 border !border-b-2 border-indigo-600 text-indigo-600"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500 text-indigo-600"
        }`}
        onClick={() => setActiveTab("settle")}
      >
        Settle Up
      </button>
    </div>
  );
};

export default Tabs;
