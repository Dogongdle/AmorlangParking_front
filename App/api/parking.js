import parkingAPI from './API';

const getParkingData = async (token, sector) => {
  try {
    return await parkingAPI.get(`/data/a_sector/`, null, {
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
};
