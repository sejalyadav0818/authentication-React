import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CountryTables = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);
  const [filteredcountry, setFilterdCountry] = useState([]);

  //getcountry function
  const getCountry = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountry(response.data);
      setFilterdCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  //to fetch country data
  useEffect(() => {
    getCountry();
  }, []);

  //columns
  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },

    {
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Flags",
      selector: (row) => (
        <img height={50} width={50} src={row.flag} alt="flag" />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}>
          Edit{" "}
        </button>
      ),
    },
  ];

  //to filter data
  useEffect(() => {
    const result = country.filter((country) => {
      return country.name.toLocaleLowerCase().match(search.toLocaleLowerCase());
    });
    setFilterdCountry(result);
  }, [search]);

  return (
    <DataTable
      title="Country List"
      columns={columns}
      data={filteredcountry}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="w-25 form-control"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      }
    />
  );
};

export default CountryTables;
