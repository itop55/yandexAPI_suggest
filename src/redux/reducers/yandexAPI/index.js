import * as allConst from '../../constants/yandexAPI';

const initialState = {
  cityStatus: true,
  status: false,
  addEventData: {
    city: {
      name: ''
    },
    organization: {
      name: ''
    },
  },
};

const yandexAPIReducer = (state = initialState, action) => {
  switch(action.type) {
    case allConst.SET_CITY_COORDS:
      return {
        ...state,
        cityCoordinates: {...action.data},
        cityStatus: action.status
      };
    case allConst.SET_ORGANIZATION_ITEM:
      return {
        ...state,
        organizationItem: action.data
      };
    case allConst.SET_ORGANIZATION_NAME:
      return {
        ...state,
        addEventData: {
          ...state.addEventData,
          organization: {
            ...state.organization,
            ...action.data
          }
        }
      };
    case allConst.SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: [...action.data]
      };
    case allConst.CLEAR_ORGANIZATIONS:
      return {
        ...state,
        organizations: ''
      };
    case allConst.CLEAR_CITY:
      return {
        ...state,
        cityCoordinates: '',
      };
    case allConst.SET_STATUS:
      return {
        ...state,
        status: !state.status
      };
    case allConst.SET_CITY_NAME:
      return {
        ...state,
        addEventData: {
          ...state.addEventData,
          city: {
            ...state.addEventData.city,
            ...action.data
          }
        }
      };
    default:
      return {
        ...state
      }
  }
};

export default yandexAPIReducer;
