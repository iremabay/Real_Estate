import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import './RentedHomes.css'; 

const RentedHomes = () => {
  const [rentedHomes, setRentedHomes] = useState([]);

  useEffect(() => {
    const storedRentedHomes = JSON.parse(localStorage.getItem('rentedHomes')) || [];
    setRentedHomes(storedRentedHomes);
  }, []);

  const handleDelete = (title) => {
    const updatedRentedHomes = rentedHomes.filter(home => home.title !== title);
    setRentedHomes(updatedRentedHomes);
    localStorage.setItem('rentedHomes', JSON.stringify(updatedRentedHomes));
    message.success('Home deleted successfully!');
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Rooms', dataIndex: 'rooms', key: 'rooms' },
    { title: 'Bathrooms', dataIndex: 'bathrooms', key: 'bathrooms' },
    { title: 'Furnished', dataIndex: 'furnished', key: 'furnished' },
    { title: 'Pool', dataIndex: 'pool', key: 'pool' },
    { title: 'Garage', dataIndex: 'garage', key: 'garage' },
    { title: 'Garden', dataIndex: 'garden', key: 'garden' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Home" style={{ width: 100 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this home?"
          onConfirm={() => handleDelete(record.title)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="rented-homes-container">
      <h2 className="rented-homes-title">Rented/Sold Homes</h2>
      <div className="rented-homes-table">
        <Table columns={columns} dataSource={rentedHomes} rowKey="title" />
      </div>
    </div>
  );
};

export default RentedHomes;
