import React from 'react';
import { Route, Routes } from "react-router";
import { Toaster, toast } from 'react-hot-toast';


import HomePage from "./pages/HomePage";
import MyList from "./pages/MyList";
import UpdateWork from "./pages/UpdateWork";
import CreateWork from "./pages/CreateWork";

const App = () => {
  return (
    <div   className="relative h-full w-full">
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      {/* <button onClick={() => toast.success("test 1 toast")} className="text-red-500">Click me to toast</button>  */}
      
      {/* <button className='btn btn-outline'>Click</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MyList" element={<MyList />} />
        <Route path="/work/:id" element={<UpdateWork />} />
        <Route path="/create" element={<CreateWork />} />
      </Routes>
    </div>
  );
}

export default App;
