import { useTab } from "./Context";

const Tabs=()=>{
    const {activeTab,setActiveTab}=useTab();

    return (
        <div className="flex mb-6 gap-2 tabs">
        <button
          className={`py-2 px-4 font-medium !outline-none ${
            activeTab === "expenses"
              ? "text-indigo-600 !border-b-2 border-primary text-primary"
              : "text-gray-600 hover:text-indigo-500 text-primary" 
          }`}
          // border-indigo-600
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </button>
        <button
          className={`py-2 px-4 font-medium !outline-none  ${
            activeTab === "balances"
              ? "text-indigo-600 !border-b-2 border-primary text-primary"
              : "text-gray-600 hover:text-indigo-500 text-primary"
          }`}
          onClick={() => setActiveTab("balances")}
        >
          Balances
        </button>
        <button
          className={`py-2 px-4 font-medium  !outline-none  ${
            activeTab === "settle"
              ? "text-indigo-600 !border-b-2 border-primary text-primary"
              : "text-gray-600 hover:text-indigo-500 text-primary"
          }`}
          onClick={() => setActiveTab("settle")}
        >
          Settle Up
        </button>
      </div>
    )
}

export default Tabs;