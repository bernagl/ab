import React, { Component } from 'react'
// import { logout } from '../actions/firebaseAuth'
import Layout from 'antd/lib/layout'
import Sidebar from '../components/Sidebar'
const { Content, Footer } = Layout

class Admin extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }}>
            <h1 className="admin-title">Admin</h1>
          </Header> */}
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                marginTop: 16,
                padding: 24,
                background: '#fff',
                boxShadow: '0px 0px 15px 6px rgb(232, 232, 232)'
              }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Admin by Mobkii</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
