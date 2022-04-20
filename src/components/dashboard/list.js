import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import CategoryIcon from "@material-ui/icons/Category";
import { useDispatch } from "react-redux";
import { customerIdProduct, sideBarProduct } from "../../redux/actions/action";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import WebIcon from "@material-ui/icons/Web";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import FlareIcon from "@mui/icons-material/Flare";
import CodeIcon from "@mui/icons-material/Code";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export const ListCopy = () => {
  const dispatch = useDispatch();
  const sideBarClick = (x) => {
    dispatch(customerIdProduct(null));
    dispatch(sideBarProduct(x));
  };
  const token = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  console.log(token);
  return (
    <div>
      {token === "reports" ? (
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
      ) : (
        <div>
          <ListItem button onClick={() => sideBarClick("home")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("technology")}>
            <ListItemIcon>
              <AcUnitIcon />
            </ListItemIcon>
            <ListItemText primary="Technology" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("customer")}>
            <ListItemIcon>
              <NaturePeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("brand")}>
            <ListItemIcon>
              <BrandingWatermarkIcon />
            </ListItemIcon>
            <ListItemText primary="Brand" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("category")}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("product")}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("site")}>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary="Site" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("appuser")}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="AppUser" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("allergen")}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Allergen" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("usergroup")}>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary="UserGroup" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("machine")}>
            <ListItemIcon>
              <PrecisionManufacturingIcon />
            </ListItemIcon>
            <ListItemText primary="Machine" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("flavourcategory")}>
            <ListItemIcon>
              <FlareIcon />
            </ListItemIcon>
            <ListItemText primary="Flavour Category" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("flavourcode")}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Flavour Code" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("masproductline")}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Product Line" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("masfilmdetail")}>
            <ListItemIcon>
              <MovieFilterIcon />
            </ListItemIcon>
            <ListItemText primary="Film Detail" />
          </ListItem>
          <ListItem button onClick={() => sideBarClick("managements")}>
            <ListItemIcon>
              <ManageSearchIcon />
            </ListItemIcon>
            <ListItemText primary="Management" />
          </ListItem>
        </div>
      )}
    </div>
  );
};
