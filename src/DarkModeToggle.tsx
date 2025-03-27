import React from "react";
import { useMyContext } from "./Context/ThemeContext";
import { MaterialUISwitch } from "./Switch";
import { FormControlLabel } from "@mui/material";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useMyContext();
  return (
    <div>
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} />}
        onClick={() => setDarkMode(!darkMode)}
        // label="Theme"
      />
    </div>
  );
};

export default DarkModeToggle;
