import './style.css'
import { useEffect, useState } from 'react';


function App() {
  const [priceData, setPriceData] = useState({});
  const [search, setSearch] = useState('');

  let error = false;

  const submitSearch = (e) => {
    e.preventDefault();
    setSearch(document.querySelector('#search').value)
    return;
  }

  useEffect(() => {
    if (!search) {
      return
    }

    fetch('https://api.binance.us/api/v3/ticker/24hr?symbol=' + search.toUpperCase() + 'USD')
      .then(res => res.json())
      .then(data => setPriceData(data))
      .catch(err => error = true)

    error = false;
  }, [search])

  if (priceData.openPrice) {
    return (
      <div className="App">
        <nav>
          <h3>Crypto Pricing Search</h3>
          <form onSubmit={submitSearch}>
            <input id='search' type="search" placeholder="Search a symbol" />
          </form>
        </nav>
        <h1>Today's Cryptocurrency Prices</h1>
        <table className="search-output">
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24hr %</th>
            </tr>
            <tr>
              <td>1</td>
              <td>{priceData && priceData.symbol}</td>
              <td>{
                priceData &&
                '$' + Number(priceData.openPrice)
                  .toFixed(2).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td style={priceData.priceChangePercent > 0 ?
                { color: 'green' } :
                { color: 'red' }}>
                {
                  priceData.priceChangePercent > 0 ?
                    '▲ ' :
                    '▼ '
                }
                {
                  priceData &&
                  Number(priceData.priceChangePercent).toFixed(2) + '%'
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="App">
        <nav>
          <h3>Crypto Pricing Search</h3>
          <form onSubmit={submitSearch}>
            <input id='search' type="search" placeholder="Search a symbol" />
          </form>
        </nav>
        <h1>Search a valid Crypto Symbol</h1>
      </div>
    )
  }
}

export default App;
