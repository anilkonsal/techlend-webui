import Head from 'next/head'
import { Layout, Typography, Result } from 'antd';
const { Content } = Layout;
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { endpoints } from '../constants'

export default function Thanks() {
  const router = useRouter();
  const [applicant, setApplicant] = useState(null)


  useEffect(async () => {
    if (router.query.applicant) {
      const { data } = await axios.get(`${endpoints.applicants}/${router.query.applicant}`)
      setApplicant(data);
    }
  }, [router.query.applicant])


  const getTitle = () => {
    const { status } = applicant;
    return status === 'warning'
      ? `Your application status is: ${status}`
      : status === 'approved'
        ? 'Your application is approved'
        : 'Your application in rejected'
  }

  return applicant ? (
    <div >
      <Layout>
        <Content className="site-layout" style={{ width: 500, margin: 'auto' }}>
          <div className="site-layout-background">
            <Typography.Title level={2}>Thanks for submitting</Typography.Title>
            <Typography.Title level={3}>{getTitle()}</Typography.Title>
          </div>
        </Content>
      </Layout>
    </div >
  ) : null
}
