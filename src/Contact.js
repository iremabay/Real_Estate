import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import './Contact.css'; // Import the CSS file
import profileImage from './images/irem.jpeg'; // Import the image

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Contact = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="contact-content">
        <Space direction="vertical" size="large" className="contact-space">
          <Title level={2} className="contact-title">Share Your Thoughts</Title>
          <img src={profileImage} alt="Profile" className="profile-image" /> 
          <Paragraph className="contact-paragraph">
            Please feel free to contact me to share your opinions or anything else.
            Your feedback is very important to me and I am always open to new ideas and suggestions.
            You can find my email address below. Additionally, you can connect with me on LinkedIn and GitHub.
            I look forward to hearing from you!
          </Paragraph>
          <Paragraph className="contact-paragraph">
            <MailOutlined /> <a href="mailto:irem.abay@outlook.com">irem.abay@outlook.com</a>
          </Paragraph>
          <Paragraph className="contact-paragraph">
            <LinkedinOutlined /> <a href="https://www.linkedin.com/in/iremabay" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </Paragraph>
          <Paragraph className="contact-paragraph">
            <GithubOutlined /> <a href="https://github.com/iremabay" target="_blank" rel="noopener noreferrer">GitHub</a>
          </Paragraph>
        </Space>
      </Content>
    </Layout>
  );
};

export default Contact;
