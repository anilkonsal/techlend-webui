import Head from 'next/head'
import axios from 'axios'
import { Form, Input, Button, DatePicker, Layout, Row, Col, Alert, Typography } from 'antd';
import { endpoints } from '../constants'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const { Content } = Layout;

export default function Home() {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null)

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(endpoints.applicants, values)
      const { id } = data;
      router.push(`/assets-liabilities?applicant=${id}`)

    } catch (e) {
      setAlertMessage('Could not save')
    }
  };

  return (

    <Layout>
      <Content>
        <div className="site-layout" style={{ width: 500, margin: 'auto' }}>
          <Typography.Title level={3} >Step 1 - Basic details</Typography.Title>
          <div className="site-layout-background">
            {alertMessage ? <Alert message={alertMessage} type="error" /> : null}
            <Form
              name="first-form"
              className="form"
              onFinish={onFinish}
              layout='vertical'
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name',
                  }
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name',
                  }
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  {
                    required: true,
                    message: 'Please input your location',
                  }
                ]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: 'Please input your date of birth',
                  }
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email address',
                  },
                  {
                    type: 'email',
                    message: 'Please enter valid email address',
                  },
                ]}
              >
                <Input type={"email"} />
              </Form.Item>
              <Form.Item
                name="photo"
                label="Photo"
                rules={[
                  {
                    required: true,
                    message: 'Please select your photo',
                  },
                ]}
              >
                <Input type="file" />
              </Form.Item>
              <Button type="primary" htmlType='submit'>Next</Button>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
