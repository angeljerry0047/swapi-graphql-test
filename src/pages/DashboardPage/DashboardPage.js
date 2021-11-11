import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Input, Space } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { GET_STARWARS } from "../../helper/graphql";
import styled from "styled-components";
import compare from "../../helper/compare";
const { Search } = Input;
const DashboardPage = () => {
  const [peoples, setPeopels] = useState([]);
  const [searchclue, setSearchclue] = useState("");
  const [favorites, setFavorites] = useState({});
  const [getStarwars, { loading, error, data = null }] = useLazyQuery(
    GET_STARWARS,
    { fetchPolicy: "network-only" }
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, row, index) => {
        return <Cell key={index}>{row.node.name}</Cell>;
      },
    },
    {
      title: "Birth Year",
      dataIndex: "birthYear",
      render: (_, row, index) => {
        return <Cell key={index}>{row.node.birthYear}</Cell>;
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (_, row, index) => {
        return <Cell key={index}>{row.node.gender}</Cell>;
      },
    },
    {
      title: "Home World",
      dataIndex: "homeWorld",
      render: (_, row, index) => {
        return <Cell key={index}>{row.node.homeworld.name}</Cell>;
      },
    },
    {
      title: "Species",
      dataIndex: "species",
      render: (_, row, index) => {
        return <Cell key={index}>{row.node.species?.name}</Cell>;
      },
    },
    {
      title: "Favorites",
      dataIndex: "favorites",
      render: (_, row, index) => {
        return (
          <FavButton onClick={() => changeFav(index)} key={index}>
            {favorites[index] ? <StarFilled /> : <StarOutlined />}
          </FavButton>
        );
      },
    },
  ];
  useEffect(() => {
    getStarwars({
      variables: {},
    });
  }, []);
  useEffect(() => {
    if (data) {
      setPeopels(data.allPeople.edges);
    }
  }, [data]);
  const sortByname = () => {
    var sortforArr = [...peoples];
    sortforArr.sort(compare);
    setPeopels(sortforArr);
  };
  const onSearch = () => {
    var filtered = [];
    if (searchclue === "") {
      setPeopels(data.allPeople.edges);
    } else {
      for (var i = 0; i < peoples.length; i++) {
        if (peoples[i].node.name.includes(searchclue))
        filtered.push(peoples[i]);
      }
      setPeopels(filtered);
    }
  };
  const changeFav = (k) => {
    setFavorites({ ...favorites, [k]: favorites[k] ? false : true });
  };
  return (
    <Layout className="layout">
      <Content>
        <Space direction="horizontal">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
            onChange={(e) => setSearchclue(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() => sortByname()}
            style={{ marginLeft: 25 }}
          >
            Sort By Name
          </Button>
        </Space>
        <TableContainer className="site-layout-content">
          {!loading && !error && (
            <NewTable
              dataSource={peoples}
              columns={columns}
              key={peoples.cursor}
            />
          )}
        </TableContainer>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Test Project ©2021 Created by Eric Lee
      </Footer>
    </Layout>
  );
};
const NewTable = styled(Table)`
  margin-top: 20px;
`;
const Cell = styled.div`
  font-size: 15px;
`;
const FavButton = styled.button`
  align-self: center;
`;
const Content = styled.div`
  padding: 50px 50px;
`;
const Footer = styled.div`
  padding: 20px 20px;
`;

const TableContainer = styled.div`
  margin: 10px 0;
`;

export default DashboardPage;
