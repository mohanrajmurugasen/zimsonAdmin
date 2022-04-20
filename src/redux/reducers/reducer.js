import { ActionType } from "../contants/actionType";

const sideBarState = {
  sideBar: "home",
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
    technologyId: 0,
    customerId: 0,
    brandId: 0,
    categoryId: 0,
    productId: 0,
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
    technology: [],
    customer: [],
    brand: [],
    category: [],
    product: [],
    site: [],
    appUser: [],
    allergen: [],
    userGroup: [],
    productLine: [],
    filmDetail: [],
    machine: [],
    flavourCategory: [],
    flavourCode: [],
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
