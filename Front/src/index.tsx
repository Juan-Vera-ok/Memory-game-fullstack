import React from 'react';
import ReactDOM from "react-dom/client";
import App from './components/App';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/darkly/bootstrap.min.css"



const rootElement = document.getElementById("App");
const root = ReactDOM.createRoot(rootElement  as HTMLElement) ;

  
root.render(<React.StrictMode>
 <App/>
</React.StrictMode>)
