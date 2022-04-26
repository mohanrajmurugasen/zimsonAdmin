import { ActionType } from "../contants/actionType";

const sideBarState = {
  sideBar: "purchase",
};

export const sideBarReducer = (state = sideBarState, { type, payload }) => {
  switch (type) {
    case ActionType.SIDEBAR:
      return {
        ...state,
        sideBar: payload,
      };
    default:
      return state;
  }
};

const customerIdState = {
  customerId: null,
};

export const customerIdReducer = (
  state = customerIdState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.CUSTOMERID:
      return {
        ...state,
        customerId: payload,
      };
    default:
      return state;
  }
};

const flavourCategoryState = {
  flavourCategory: null,
};

export const flavourCategoryReducer = (
  state = flavourCategoryState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.FLAVOURCATEGORY:
      return {
        ...state,
        flavourCategory: payload,
      };
    default:
      return state;
  }
};

const masProductLineState = {
  masProductLine: {
    location: "",
    brand: "",
    star: 0,
    rate: "",
  },
};

export const masProductLineReducer = (
  state = masProductLineState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.MASPRODUCTLINE:
      return {
        ...state,
        masProductLine: {
          ...state.masProductLine,
          [payload.type]: payload.val,
        },
      };
    default:
      return state;
  }
};

const nonpurchaseState = {
  nonpurchase: {
    location: "",
    brand: "",
    price: 0,
    star: "",
  },
};

export const nonpurchaseReducer = (
  state = nonpurchaseState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.NONPURCHASE:
      return {
        ...state,
        nonpurchase: {
          ...state.nonpurchase,
          [payload.type]: payload.val,
        },
      };
    default:
      return state;
  }
};

const serviceState = {
  service: {
    location: "",
    receipt: "",
    quality: "",
  },
};

export const serviceReducer = (state = serviceState, { type, payload }) => {
  switch (type) {
    case ActionType.SERVICE:
      return {
        ...state,
        service: {
          ...state.service,
          [payload.type]: payload.val,
        },
      };
    default:
      return state;
  }
};

const productIdState = {
  productId: 0,
};

export const productIdReducer = (state = productIdState, { type, payload }) => {
  switch (type) {
    case ActionType.PRODUCTID:
      return {
        ...state,
        productId: payload,
      };
    default:
      return state;
  }
};

const technologyState = {
  technology: {
    purchase: [],
    nonpurchase: [],
    service: [],
    brand: [],
    location: [],
  },
};

export const technologyReducer = (
  state = technologyState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.TECHNOLOGY:
      return {
        ...state,
        technology: {
          ...state.technology,
          [payload.type]: payload.val,
        },
      };
    default:
      return state;
  }
};
