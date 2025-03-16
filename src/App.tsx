import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import Tabs from './Tabs'
import { ContextProvider, useTab } from './Context'
import TabContent from './TabContent'
import { Provider } from 'react-redux'
import store from "./redux/Store"

function App() {

  const {theme}=useTab();
  
  useEffect(()=>{document.documentElement.classList.toggle(
    "dark",
    theme === "dark" ||
      (
        // !("theme" in localStorage) &&
       window.matchMedia("(prefers-color-scheme: dark)").matches),
  );},[theme]);

  return (
    <Provider store={store}>
    <ContextProvider>
      {/* <Expense /> */}
      <Header/>
      <Tabs/>
      <TabContent/>
    
    </ContextProvider>
    </Provider>
  )
}

export default App
