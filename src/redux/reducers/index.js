import { combineReducers } from "redux";
import {
  customerIdReducer,
  flavourCategoryReducer,
  masProductLineReducer,
  productIdReducer,
  sideBarReducer,
  technologyReducer,
} from "./reducer";

const store = combineReducers({
  addSideBar: sideBarReducer,
  addCustomerId: customerIdReducer,
  addMasProductLine: masProductLineReducer,
  addProductId: productIdReducer,
  addTechnology: technologyReducer,
  addFlavourCategory: flavourCategoryReducer,
});

export default store;
