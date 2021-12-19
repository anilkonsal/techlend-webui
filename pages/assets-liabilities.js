import axios from 'axios'
import { Form, Input, Button, Alert, Layout, Typography, Row, Col } from 'antd';
import Head from 'next/head'
import { endpoints } from '../constants'
import { useState } from 'react';
import { useRouter } from 'next/router';

const { Content } = Layout;

export default function AssetsLiabilities() {

  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState(null)

  const onFinish = async (values) => {
    try {
      const { data } = await axios.patch(`${endpoints.applicants}/${router.query.applicant}`, values)
      const { id } = data;
      router.push(`/thanks?applicant=${id}`)

    } catch (e) {
      setAlertMessage('Could not save')
    }
  };


  return (
    <div >
      <Layout>
        <Content className="site-layout" style={{ width: 500, margin: 'auto' }}>
          <Typography.Title level={3} >Step 2 - Assets and Liabilities</Typography.Title>
          <div className="site-layout-background" >
            {alertMessage ? <Alert message={alertMessage} type="error" /> : null}
            <Typography.Title level={4} >Assets</Typography.Title>
            <Form
              name="second-form"
              className="form"
              onFinish={onFinish}
              layout='vertical'
            >
              <Form.Item
                name="salaryPerQuater"
                label="Salary Per Quarter ($)"
                rules={[
                  {
                    required: true,
                    message: 'Please input your salary',
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
              <Form.Item
                name="totalBankSavingsAmount"
                label="Total Bank Savings ($)"
                rules={[
                  {
                    required: true,
                    message: 'Please input your total bank savings',
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
              <Row gutter="24">
                <Col span="12">
                  <Form.Item
                    name="nameOfStock"
                    label="Name of Stock (eg: TSLA, IBM)"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your salary',
                      }
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item
                    name="valueOfStock"
                    label="Value of Stock ($)"
                    rules={[
                      {
                        required: true,
                        message: 'Please input value of stock',
                      }
                    ]}
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                </Col>

              </Row>
              <Typography.Title level={4} >Liabilities</Typography.Title>
              <Form.Item
                name="creditCardDebtAmount"
                label="Credit Card Debt Amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your credit card debt amount',
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
              <Form.Item
                name="homeLoaDebtAmount"
                label="Home Loan Debt Amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your home loan debt amount',
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
              <Form.Item
                name="carLoaDebtAmount"
                label="Car Loan Debt Amount"
                rules={[
                  {
                    required: true,
                    message: 'Please input your car loan debt amount',
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>


              <Button type="primary" htmlType='submit'>Submit</Button>
            </Form>
          </div>
        </Content>
      </Layout>
    </div >
  )
}
