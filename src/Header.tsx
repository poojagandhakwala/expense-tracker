import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { MaterialUISwitch } from "./Switch";
import { useTab } from "./Context";

const Header = () => {
  // Currencies
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
  ];

  const [currency, setCurrency] = useState<string>("USD");
  const { setTheme, theme } = useTab();

  return (
    <div >
      <div
      //  className="p-2 rounded-md text-gray-900 dark:text-white transition-all bg-primary text-primary"

      className={`flex justify-between items-center mb-8 bg-primary`}
      >
        <h1 className="text-3xl font-bold text-indigo-600 ">Expense Share</h1>
        {/* <Switch defaultChecked /> */}

        <div className="flex items-center space-x-2">
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            label="Theme"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border rounded-md bg-primary text-theme"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code} className="text-gray-800">
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
