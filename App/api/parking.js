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
    return await parkingAPI.post(`/reserve/${sector}/${number}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const registerPush = async (token, sector, number) => {
  // 자리 찜하기.
  try {
    return await parkingAPI.post(
      '/push',
      {sector: sector, seat: number},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export default {
  getParkingData,
  reserveSeat,
  registerPush,
};
