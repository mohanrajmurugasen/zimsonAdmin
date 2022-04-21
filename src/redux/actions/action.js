import { ActionType } from "../contants/actionType";

export const sideBarProduct = (sidebar) => {
  return {
    type: ActionType.SIDEBAR,
    payload: sidebar,
  };
};

export const customerIdProduct = (customerId) => {
  return {
    type: ActionType.CUSTOMERID,
    payload: customerId,
  };
};

export const flavourCategoryProduct = (flavourCategory) => {
  return {
    type: ActionType.FLAVOURCATEGORY,
    payload: flavourCategory,
  };
};

export const masProductLineProduct = (masProductLine) => {
  return {
    type: ActionType.MASPRODUCTLINE,
    payload: masProductLine,
  };
};

export const nonpurchaseProduct = (nonpurchase) => {
  return {
    type: ActionType.NONPURCHASE,
    payload: nonpurchase,
  };
};

export const serviceProduct = (service) => {
  return {
    type: ActionType.SERVICE,
    payload: service,
  };
};

export const ProductIdProduct = (ProductId) => {
  return {
    type: ActionType.PRODUCTID,
    payload: ProductId,
  };
};

export const technologyProduct = (technology) => {
  return {
    type: ActionType.TECHNOLOGY,
    payload: technology,
  };
};
