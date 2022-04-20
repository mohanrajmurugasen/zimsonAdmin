import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useDispatch } from "react-redux";
import { customerIdProduct, sideBarProduct } from "../../redux/actions/action";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export const ListCopy = () => {
  const dispatch = useDispatch();
  const sideBarClick = (x) => {
    dispatch(customerIdProduct(null));
    dispatch(sideBarProduct(x));
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
        <ListItem button onClick={() => sideBarClick("reports")}>
          <ListItemIcon>
            <PictureAsPdfIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </div>
    </div>
  );
};
