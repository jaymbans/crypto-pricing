import './style.css'
import { useEffect, useState } from 'react';


function App() {
  // https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSD
  const [priceData, setPriceData] = useState({});

  useEffect(() => {
    fetch('https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSD')
      .then(res => res.json())
      .then(data => setPriceData(data))
      .catch(err => console.log(err))
  }, [priceData])

  return (
    <div className="App">
      <nav>
        <h3>Crypto Pricing Search</h3>
        <input type="text" placeholder="Search" />
      </nav>
      <h1>Today's Cryptocurrency Prices</h1>
      <table className="search-output">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>24hr %</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Bitcoin</td>
          <td>$40,000</td>
          <td>2.02%</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
