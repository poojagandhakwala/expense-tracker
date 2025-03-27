import Balances from "./Balances";
import { useMyContext } from "./Context/ThemeContext";
import Expense from "./Expenses";
import Settle from "./Settle";

const TabContent = () => {
  const { activeTab, theme } = useMyContext();

  return (
    <div className={`min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-lg`}>
      <div className="max-w-4xl mx-auto">
        {activeTab === "expenses" && <Expense />}
        {activeTab === "balances" && <Balances />}
        {activeTab === "settle" && <Settle />}
      </div>
    </div>
  );
};

export default TabContent;
