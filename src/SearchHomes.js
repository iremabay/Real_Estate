import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, InputNumber, Button, Table, Popconfirm, message } from 'antd';
import './SearchHomes.css'; 

const SearchHomes = () => {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);

  useEffect(() => {
    const storedHomes = JSON.parse(localStorage.getItem('homes')) || [];
    setHomes(storedHomes);
    setFilteredHomes(storedHomes.filter(home => home.status !== 'Rented'));
  }, []);

  const onFinish = (values) => {
    const filters = {
      title: values.title || '',
      description: values.description || '',
      minPrice: values.minPrice || 0,
      maxPrice: values.maxPrice || Infinity,
      city: values.city || '',
      type: values.type || '',
      rooms: values.rooms || '',
      bathrooms: values.bathrooms || '',
      roomsImportance: values.roomsImportance || '',
      bathroomsImportance: values.bathroomsImportance || '',
      furnished: values.furnishedImportance || '',
      pool: values.poolImportance || '',
      garage: values.garageImportance || '',
      garden: values.gardenImportance || '',
    };

    const filtered = homes.filter((home) => {
      const matchesTitle = home.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesDescription = home.description.toLowerCase().includes(filters.description.toLowerCase());
      const matchesPrice = home.price >= filters.minPrice && home.price <= filters.maxPrice;
      const matchesCity = home.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchesType = filters.type === '' || home.type === filters.type;
      
      const matchesRooms = (filters.roomsImportance === 'mustHave' && home.rooms == filters.rooms) ||
                          (filters.roomsImportance === 'mustNotHave' && home.rooms != filters.rooms) ||
                          (filters.roomsImportance === 'niceToHave' || filters.roomsImportance === '');
                          
      const matchesBathrooms = (filters.bathroomsImportance === 'mustHave' && home.bathrooms == filters.bathrooms) ||
                              (filters.bathroomsImportance === 'mustNotHave' && home.bathrooms != filters.bathrooms) ||
                              (filters.bathroomsImportance === 'niceToHave' || filters.bathroomsImportance === '');

      const matchesFurnished = (filters.furnished === 'mustHave' && home.furnished === 'Yes') ||
                               (filters.furnished === 'mustNotHave' && home.furnished === 'No') ||
                               (filters.furnished === 'niceToHave' || filters.furnished === '');
      
      const matchesPool = (filters.pool === 'mustHave' && home.pool === 'Yes') ||
                          (filters.pool === 'mustNotHave' && home.pool === 'No') ||
                          (filters.pool === 'niceToHave' || filters.pool === '');

      const matchesGarage = (filters.garage === 'mustHave' && home.garage === 'Yes') ||
                            (filters.garage === 'mustNotHave' && home.garage === 'No') ||
                            (filters.garage === 'niceToHave' || filters.garage === '');

      const matchesGarden = (filters.garden === 'mustHave' && home.garden === 'Yes') ||
                            (filters.garden === 'mustNotHave' && home.garden === 'No') ||
                            (filters.garden === 'niceToHave' || filters.garden === '');

      return matchesTitle && matchesDescription && matchesPrice && matchesCity && matchesType &&
        matchesRooms && matchesBathrooms && matchesFurnished && matchesPool && matchesGarage && matchesGarden;
    });

    setFilteredHomes(filtered.filter(home => home.status !== 'Rented'));
  };

  const handleRent = (home) => {
    const confirmRent = window.confirm(`Do you want to rent this home?\n\nTitle: ${home.title}\nDescription: ${home.description}\nPrice: ${home.price}`);
    if (confirmRent) {
      const updatedHomes = homes.map(h => {
        if (h.title === home.title) {
          return { ...h, status: 'Rented' };
        }
        return h;
      });
      setHomes(updatedHomes);
      setFilteredHomes(updatedHomes.filter(h => h.status !== 'Rented'));
      localStorage.setItem('homes', JSON.stringify(updatedHomes));

      const rentedHomes = JSON.parse(localStorage.getItem('rentedHomes')) || [];
      rentedHomes.push(home);
      localStorage.setItem('rentedHomes', JSON.stringify(rentedHomes));
      
      message.success('Mail sent and home rented successfully!');
    }
  };

  const handleDelete = (title) => {
    const updatedHomes = homes.filter(home => home.title !== title);
    setHomes(updatedHomes);
    setFilteredHomes(updatedHomes.filter(home => home.status !== 'Rented'));
    localStorage.setItem('homes', JSON.stringify(updatedHomes));
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
        <div>
          <Button type="link" onClick={() => handleRent(record)}>Rent</Button>
          <Popconfirm
            title="Are you sure to delete this home?"
            onConfirm={() => handleDelete(record.title)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="search-home-container">
      <Form
        name="filterHomes"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        className="search-home-form"
      >
        <Form.Item
          label="Title"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Min Price"
          name="minPrice"
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Max Price"
          name="maxPrice"
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
        >
          <Radio.Group>
            <Radio value="rent">Rent</Radio>
            <Radio value="sale">Sale</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Rooms"
          name="rooms"
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Rooms Importance"
          name="roomsImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Bathrooms"
          name="bathrooms"
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Bathrooms Importance"
          name="bathroomsImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Furnished"
          name="furnishedImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Pool"
          name="poolImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Garage"
          name="garageImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Garden"
          name="gardenImportance"
        >
          <Radio.Group>
            <Radio value="mustHave">Must Have</Radio>
            <Radio value="mustNotHave">Must Not Have</Radio>
            <Radio value="niceToHave">Nice to Have</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }} 
          style={{ textAlign: 'center' }} 
        >
          <Button type="primary" htmlType="submit">
            Search Homes
          </Button>
        </Form.Item>
      </Form>
      <h2>Available Homes</h2>
      <Table columns={columns} dataSource={filteredHomes} rowKey="title" />
    </div>
  );
};

export default SearchHomes;
