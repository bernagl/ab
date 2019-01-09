import React, { Component } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import Divider from 'antd/lib/divider'

const data = [
  { name: 'Enero', Proveedores: 4000, Usuarios: 2400, amt: 2400 },
  { name: 'Febrero', Proveedores: 3000, Usuarios: 1398, amt: 2210 },
  { name: 'Marzo', Proveedores: 2000, Usuarios: 9800, amt: 2290 },
  { name: 'Abril', Proveedores: 2780, Usuarios: 3908, amt: 2000 },
  { name: 'Mayo', Proveedores: 1890, Usuarios: 4800, amt: 2181 },
  { name: 'Junio', Proveedores: 2390, Usuarios: 3800, amt: 2500 },
  { name: 'Julio', Proveedores: 1490, Usuarios: 5300, amt: 2100 },
  { name: 'Agosto', Proveedores: 490, Usuarios: 6300, amt: 2100 },
  { name: 'Septiembre', Proveedores: 6490, Usuarios: 3300, amt: 2100 },
  { name: 'Octubre', Proveedores: 790, Usuarios: 4300, amt: 2100 },
  { name: 'Noviembre', Proveedores: 390, Usuarios: 2200, amt: 2100 },
  { name: 'Diciembre', Proveedores: 1490, Usuarios: 3300, amt: 2100 }
]

class Dashboard extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12">
          <h2>Dashboard</h2>
          <Divider />
        </div>
        <div className="col-12">
          <ResponsiveContainer height={400} width="100%">
            <LineChart
              width={900}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Usuarios"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Proveedores" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}

export default Dashboard
