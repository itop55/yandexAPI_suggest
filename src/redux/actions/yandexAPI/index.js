import * as allConst from '../../constants/yandexAPI';
import axios from 'axios'

export const setCityCoords = (data, status) => ({
  type: allConst.SET_CITY_COORDS,
  data,
  status
});
export const setOrganizationData = data => ({
  type: allConst.SET_ORGANIZATIONS,
  data
});
export const setOrganizationCoords = data => ({
  type: allConst.SET_ORGANIZATION_ITEM,
  data
});
export const setOrganizationName = data => ({
  type: allConst.SET_ORGANIZATION_NAME,
  data
});
export const setCityName = data => ({
  type: allConst.SET_CITY_NAME,
  data
});
export const clearOrganizationData = () => ({
  type: allConst.CLEAR_ORGANIZATIONS
});
export const clearCityData = () => ({
  type: allConst.CLEAR_CITY
});
export const setStatus = () => ({
  type: allConst.SET_STATUS
});

const YANDEX_API_URL = 'https://search-maps.yandex.ru/v1';
const API_KEY_SEARCH_YANDEX = '...';

const fetchYandexAPI = (url) => {
  return axios.get(`${YANDEX_API_URL}/${url}`)
    .then(response => {
      return response;
    }).catch(error => {
      return {error: error.message};
    });
};

export const getCityCoords = (ymaps, value) => {
  return dispatch => {
    ymaps.geocode(value).then((res) => {
      const firstGeoObject = res.geoObjects.get(0)

      if (firstGeoObject) {
        dispatch({
          type: allConst.SET_CITY_COORDS,
          data: {
            name: value,
            coordinates: firstGeoObject.geometry.getCoordinates(),
            boundedBy: firstGeoObject.properties.get('boundedBy')
          },
          status: false
        })
        dispatch({
          type: allConst.SET_STATUS
        })
      } else {
        console.error("getCityCoords")
      }
    })
  }
}

export const getOrganizationCoords = (input, coordinates, boundedBy) => {
  return dispatch => {
    dispatch({
      type: allConst.GET_ORGANIZATION_COORDS,
      payload: { input, coordinates, boundedBy }
    })

    const boundOne = boundedBy ? Math.abs(boundedBy[0][1] - boundedBy[0][0]) : null;
    const boundTwo = boundedBy ? Math.abs(boundedBy[1][1] - boundedBy[1][0]) : null;
    const coordinatesLL = coordinates ? `${coordinates[1]},${coordinates[0]}` : null;
    const params = `?text=${input}&rspn=1&ll=${coordinatesLL}&spn=${boundOne}, ${boundTwo}&lang=ru_RU&apikey=${API_KEY_SEARCH_YANDEX}`;

    fetchYandexAPI(params).then(response => {
      if (!response.error) {
        dispatch({
          type: allConst.SET_ORGANIZATIONS,
          data: response.data.features
        })
      } else {
        console.error("getOrganizationCoords")
      }
    })
  }
}

