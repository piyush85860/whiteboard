import React, { createContext, use, useRef, useState } from 'react'
import App from '../App';
export const data=createContext();
const Context = () => {
    const icons=[<i className="ri-pencil-line"></i>,<i className="ri-eraser-line"></i>,<i className="ri-shapes-line"></i>,<i className="ri-rectangle-line"></i>,<i className="ri-arrow-go-back-line"></i>,<i className="ri-arrow-go-forward-line"></i>];
    const barmap={notactive:'p-2 py-2  text-white',active:'p-2 py-2  text-white bg-gray-800 rounded-3xl'};
   const [activeTool, setactiveTool] = useState(0);
   const [panels, setpanels] = useState([false,false,false,false,false,false]);
    const iswritingRef = useRef(false);
    const mousexRef = useRef(0);
    const mouseyRef = useRef(0);
    const [brushSize, setBrushSize] = useState(2);
    const [colorSet, setcolorSet] = useState('white');
    return (
    <data.Provider value={{icons,barmap,activeTool,setactiveTool,panels,setpanels,iswritingRef,mousexRef,mouseyRef,brushSize,setBrushSize,colorSet,setcolorSet}}>
        <App/>
    </data.Provider>
  )
}

export default Context