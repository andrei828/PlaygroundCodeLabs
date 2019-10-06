import React from 'react';
import './App.css';
import { ShopProducts } from './ShopProducts.js'
import { FilterBar } from './FilterBar.js'
function App() {
  return (
    <div className="App">

      <FilterBar />
      <ShopProducts/>

      {/*<ShopProducts />*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
    </div>
  );
}

export default App;
