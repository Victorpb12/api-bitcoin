import { 
  StyleSheet, 
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useEffect, useState } from 'react';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';

function addZero(number) {
  if (number <= 9) {
    return '0' + number; 
  } 
  return number;
};

// function simulatedApiResponse () {
//   return {
//     "bpi": {
//       "2023-09-01": 128.2597,
//       "2023-10-02": 127.3648,
//       "2023-11-02": 127.3648,
//       "2023-12-03": 127.5915,
//       "2023-13-04": 120.5738,
//       "2023-14-02": 127.3648,
//       "2023-15-05": 120.5333
//     },
//   }
// };

// async function getListCoins(url) {
//   let selectListQuotations = simulatedApiResponse().bpi;
//   const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
//     return {
//       data: key.split('-').reverse().join('/'),
//       valor: selectListQuotations[key],
//     };
//   });
//   let data = queryCoinsList.reverse();
//   return data; 
// };

// async function getPriceCoinsGraphic(url) {
//   let selectListQuotationsG = simulatedApiResponse().bpi;
//   const queryCoinsList = Object.keys(selectListQuotationsG).map((key) => {
//     return selectListQuotationsG[key];
//   });
//   let dataG = queryCoinsList;
//   return dataG;
// };

function url (qtdDays) {
  const date = new Date();
  const listLastDays = qtdDays;
  
  const end_date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;  
  
  date.setDate(date.getDate() - listLastDays);
  
  const start_date = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;

  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}` 
};

// Funções para retornar a API

async function getListCoins(url) {
  let response = await fetch(url);
  let returnApi = await response.json(); 
  let selectListQuotations = returnApi.bpi;
  const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
    return {
      data: key.split('-').reverse().join('/'),
      valor: selectListQuotations[key],
    };
  });
  let data = queryCoinsList.reverse();
  return data;
};

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = returnApiG.bpi;
  const queryCoinsList = Object.keys(selectListQuotationsG).map((key) => {
    return selectListQuotationsG[key];
  });
  let dataG = queryCoinsList;
  return dataG;
};

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(7);
  const [updateData, setUpdateData] = useState(true);
  const [price, setPrice] = useState();

  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  };

  function priceCotation () {
    setPrice(coinsGraphicList.pop());
  };

  useEffect(() => {
    getListCoins(url(days)).then((data) => {
      setCoinsList(data);
    });

    getPriceCoinsGraphic(url(days)).then((dataG) => {
      setCoinsGraphicList(dataG);
    });
    priceCotation();
    if (updateData) {
      setUpdateData(false);
    };

  }, [updateData]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor='#f50d41'
        barStyle='dark-content'
      />
      <CurrentPrice currentPrice={price}/>
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <QuotationsList filterDay={updateDay} listTransactions={coinsList} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40: 0,
  },
});
