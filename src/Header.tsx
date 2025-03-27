import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  // Currencies
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];

  const [currency, setCurrency] = useState<string>("USD");

  return (
    <div>
      <div className={`flex justify-between items-center mb-8 bg-whitedark:bg-gray-800`} >
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-gray-200">
          Expense Share
        </h1>
        <div className="flex items-center space-x-2">
          <DarkModeToggle />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border dark:border-none focus:dark:outline-none rounded-md bg-[#f9f9f9]  dark:bg-gray-700 dark:text-gray-200"
          >
            {currencies.map((curr) => (
              <option
                key={curr.code}
                value={curr.code}
                className="text-gray-800 dark:text-gray-200"
              >
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
