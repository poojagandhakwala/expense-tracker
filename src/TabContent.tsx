import Balances from "./Balances";
import { useTab } from "./Context";
import Expense from "./Expenses";
import Settle from "./Settle";

const TabContent = () => {
  const { activeTab, theme } = useTab();

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme==="light"?"bg-gray-50":"bg-gray-700"} rounded-lg`}>
      <div className="max-w-4xl mx-auto">
        {activeTab === "expenses" && <Expense />}
        {activeTab === "balances" && <Balances />}
        {activeTab === "settle" && <Settle />}
      </div>
    </div>
  );
};

export default TabContent;
