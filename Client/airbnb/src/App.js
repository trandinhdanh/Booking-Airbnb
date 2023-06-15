import Routers from "./Router/Routers";
import "./App.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch()
  // useEffect(() => { 
  //   dispatch(getAllProduct());
  //   },[dispatch])
  return (
    <div className="">
      <Routers/>
    </div>
  );
}

export default App;