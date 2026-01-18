import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Context from './contextapi/Context.jsx'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <Context/>
    </BrowserRouter>
 
)
