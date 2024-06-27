import React, { useState } from 'react';
import { Form, Input, Radio, InputNumber, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddNewHome.css'; 

const AddNewHome = () => {
  const [image, setImage] = useState(null);

  const onFinish = (values) => {
    const newHome = {
      ...values,
      furnished: values.furnished === 'yes' ? 'Yes' : 'No',
      pool: values.pool === 'yes' ? 'Yes' : 'No',
      garage: values.garage === 'yes' ? 'Yes' : 'No',
      garden: values.garden === 'yes' ? 'Yes' : 'No',
      image: image,
    };

    const existingHomes = JSON.parse(localStorage.getItem('homes')) || [];
    existingHomes.push(newHome);
    localStorage.setItem('homes', JSON.stringify(existingHomes));
    message.success('Home added successfully!');
  };

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="add-home-container">
      <Form
        name="newHome"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        className="add-home-form"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please input the city!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select the type!' }]}
        >
          <Radio.Group>
            <Radio value="rent">Rent</Radio>
            <Radio value="sale">Sale</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Rooms"
          name="rooms"
          rules={[{ required: true, message: 'Please input the number of rooms!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Bathrooms"
          name="bathrooms"
          rules={[{ required: true, message: 'Please input the number of bathrooms!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Furnished"
          name="furnished"
          rules={[{ required: true, message: 'Please select if the home is furnished!' }]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Pool"
          name="pool"
          rules={[{ required: true, message: 'Please select if the home has a pool!' }]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Garage"
          name="garage"
          rules={[{ required: true, message: 'Please select if the home has a garage!' }]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Garden"
          name="garden"
          rules={[{ required: true, message: 'Please select if the home has a garden!' }]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }} 
          style={{ textAlign: 'center' }} 
        >
          <Button type="primary" htmlType="submit">
            Add Home
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewHome;
