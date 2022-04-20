import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import "../../../assets/css/category.css";
import { Button, Tab, Tabs } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { CSVLink } from "react-csv";
import authaxios from "../../interceptors/authaxios";

export default function NewManagements() {
  const [key, setKey] = useState("home");
  const [csvData, setcsv] = useState([]);
  const [tabs, setTabs] = useState(null);

  useEffect(() => {
    if (tabs === "Customer") {
      authaxios
        .get("Customers")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Brand") {
      authaxios
        .get("Brands")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Technology") {
      authaxios
        .get("Technologys")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Category") {
      authaxios
        .get("Categorys")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Product") {
      authaxios
        .get("Products")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Site") {
      authaxios
        .get("Sites")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "App User") {
      authaxios
        .get("AppUsers")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Allergen") {
      authaxios
        .get("Allergens")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "User Group") {
      authaxios
        .get("UserGroups")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Product Line") {
      authaxios
        .get("MasProductLines")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Film Detail") {
      authaxios
        .get("MasFilmDetails")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Machine") {
      authaxios
        .get("Machines")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Flavour Categorys") {
      authaxios
        .get("FlavourCategorys")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    } else if (tabs === "Flavour Codes") {
      authaxios
        .get("FlavourCodes")
        .then((res) => {
          setcsv(res.data);
        })
        .catch((err) => console.error(err.message));
    }
  }, [tabs]);

  return (
    <div>
      <div className="top">
        <div>
          <h3>Management</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/getting-started/installation/">
              KolAppService
            </Link>
            <Typography color="textPrimary">Management</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="tabing">
          <div>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="CSV">
                <div className="d-flex justify-content-between">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(options) => options.label}
                    onChange={(event, newValue) => {
                      setTabs(newValue.label);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Item" />
                    )}
                  />
                  <div>
                    <Button
                      style={{ backgroundColor: "#0f5953" }}
                      variant="contained"
                      color="primary"
                    >
                      <LocalPrintshopIcon className="me-2 text-light" />
                      <CSVLink
                        data={csvData}
                        filename={`${tabs}.csv`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        CSV
                      </CSVLink>
                    </Button>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="To Be Designed">
                <p></p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

const top100Films = [
  { label: "Technology" },
  { label: "Customer" },
  { label: "Brand" },
  { label: "Category" },
  { label: "Product" },
  { label: "Site" },
  { label: "App User" },
  { label: "Allergen" },
  { label: "User Group" },
  { label: "Product Line" },
  { label: "Film Detail" },
  { label: "Machine" },
  { label: "Flavour Categorys" },
  { label: "Flavour Codes" },
];
