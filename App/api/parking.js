import parkingAPI from './API';
const getParkingData = async (token, sector) => {
  try {
    return await parkingAPI.get(`/data/${sector}/`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const reserveSeat = async (token, sector, number) => {
  try {
    return await parkingAPI.post(`/data/${sector}/${number}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getParkingData,
  reserveSeat,
};
