import useFetch from 'react-fetch-hook';

import './index.css';

export default function Header () {

    const { isLoading, data, error } = useFetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')

    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    

    const usdValue = data?.find(item => item.cc === 'USD')
    const eurValue = data?.find(item => item.cc === 'EUR')

  return (
    <header className='header'>
        <div className='header__container'>
        <h1 className='header__title'>Конвектор валют</h1>
        <div className='header__rate'>
            <div className='header__rate-item'>
                <span className='header__rate-value'>
                {usdValue?.rate.toFixed(2)} грн / {usdValue?.txt}
                </span>
            </div>
            <div className='header__rate-item'>
                <span className='header__rate-value'>{eurValue?.rate.toFixed(2)} грн / {eurValue?.txt}</span>
            </div>
        </div>
        </div>
    </header>
  )
}