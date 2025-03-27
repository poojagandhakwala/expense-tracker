import Header from "./Header";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className="p-4">
        {/* <ContextProvider> */}
        {/* <Expense /> */}
        <Header />
        <Tabs />
        <TabContent />
        </div>
        {/* </ContextProvider> */}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
