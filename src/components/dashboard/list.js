import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useDispatch } from "react-redux";
import {
  customerIdProduct,
  masProductLineProduct,
  nonpurchaseProduct,
  serviceProduct,
  sideBarProduct,
} from "../../redux/actions/action";
import Shop2Icon from "@mui/icons-material/Shop2";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";

export const ListCopy = () => {
  const dispatch = useDispatch();
  const sideBarClick = (x) => {
    dispatch(customerIdProduct(null));
    dispatch(sideBarProduct(x));
    dispatch(
      serviceProduct({
        type: "location",
        val: "",
      })
    );
    dispatch(
      nonpurchaseProduct({
        type: "location",
        val: "",
      })
    );
    dispatch(
      masProductLineProduct({
        type: "location",
        val: "",
      })
    );
  };
  return (
    <div>
      <div>
        <ListItem button onClick={() => sideBarClick("home")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => sideBarClick("purchase")}>
          <ListItemIcon>
            <Shop2Icon />
          </ListItemIcon>
          <ListItemText primary="Purchase" />
        </ListItem>
        <ListItem button onClick={() => sideBarClick("nonpurchase")}>
          <ListItemIcon>
            <BrowserNotSupportedIcon />
          </ListItemIcon>
          <ListItemText primary="NonPurchase" />
        </ListItem>
        <ListItem button onClick={() => sideBarClick("service")}>
          <ListItemIcon>
            <MiscellaneousServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Service" />
        </ListItem>
        <ListItem button onClick={() => sideBarClick("location")}>
          <ListItemIcon>
            <AddLocationAltIcon />
          </ListItemIcon>
          <ListItemText primary="Location List" />
        </ListItem>
        <ListItem button onClick={() => sideBarClick("brand")}>
          <ListItemIcon>
            <BrandingWatermarkIcon />
          </ListItemIcon>
          <ListItemText primary="Brand List" />
        </ListItem>
      </div>
    </div>
  );
};
