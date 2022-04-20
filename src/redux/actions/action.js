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
