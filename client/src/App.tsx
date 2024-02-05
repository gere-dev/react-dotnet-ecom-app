import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Catalog from './pages/catalog/Catalog';
import About from './pages/about/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from './pages/errors/ServerError';
import Basket from './pages/Basket';
import { useStoreContext } from './contexts/StoreContext';
import { useEffect, useState } from 'react';
import { getCookie } from './utils/utils';
import agent from './api/agent';
import Loading from './components/Loading';
import Checkout from './pages/Checkout';

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <ToastContainer position='bottom-right' toastClassName='dark-toast' autoClose={2000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/about' element={<About />} />
        <Route path='/catalog/:id' element={<Catalog />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/server-error' element={<ServerError />} />
      </Routes>
    </>
  );
}

export default App;
