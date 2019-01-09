import React, { Component } from 'react'
import Layout from 'antd/lib/layout'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import { NavLink, withRouter } from 'react-router-dom'
import { logout } from '../actions/firebaseAuth'
import logo from '../assets/images/SKIPUM.png'

const { Sider } = Layout

class Sidebar extends Component {
  state = { collapsed: false }
  render() {
    const path = this.props.location.pathname.replace('/', '')
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={() =>
          this.setState(({ collapsed }) => ({
            collapsed: !collapsed
          }))
        }
      >
        <div className="logo p-4">
          <img alt="" src={logo} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
          <Menu.Item key="dashboard">
            <NavLink activeClassName="active" to="/dashboard">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="categories">
            <NavLink activeClassName="active" to="/categories">
              <Icon type="tags" />
              <span>Categorías</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="notifications">
            <NavLink activeClassName="active" to="/notifications">
              <Icon type="notification" />
              <span>Notificaciones</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="providers">
            <NavLink activeClassName="active" to="/providers">
              <Icon type="team" />
              <span>Proveedores</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="users">
            <NavLink activeClassName="active" to="/users">
              <Icon type="user" />
              <span>Usuarios</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="banner">
            <NavLink activeClassName="active" to="/banner">
              <Icon type="picture" />
              <span>Banner</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout" onClick={logout}>
            <Icon type="logout" />
            <span>Salir</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(Sidebar)
