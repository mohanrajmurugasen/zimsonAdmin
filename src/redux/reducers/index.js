import { combineReducers } from "redux";
import {
  customerIdReducer,
  flavourCategoryReducer,
  masProductLineReducer,
  nonpurchaseReducer,
  productIdReducer,
  serviceReducer,
  sideBarReducer,
  technologyReducer,
} from "./reducer";

const store = combineReducers({
  addSideBar: sideBarReducer,
  addCustomerId: customerIdReducer,
  addMasProductLine: masProductLineReducer,
  addnonpurchase: nonpurchaseReducer,
  addservice: serviceReducer,
  addProductId: productIdReducer,
  addTechnology: technologyReducer,
  addFlavourCategory: flavourCategoryReducer,
});

export default store;
