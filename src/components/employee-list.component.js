import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EmployeeService from '../services/EmployeeService';

export default class EmployeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    EmployeeService.getAll()
      .then(res => {
        this.setState({
          employees: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEmployee(id) {
    EmployeeService.remove(id)
      .then((res) => {
        console.log('Employee successfully deleted!')
      }).catch((error) => {
        console.log(error)
      })

    this.setState({ employees: this.state.employees.filter(emp => emp._id !== id) });
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.employees.map(obj => (
            <tr key={obj._id}>
              <td>{obj.fname}</td>
              <td>{obj.lname}</td>
              <td>{obj.position}</td>
              <td>{obj.department}</td>
              <td>
                <Link className="edit-link" to={"/edit-employee/" + obj._id}>
                  Edit
                        </Link>
                <Button onClick={() => this.deleteEmployee(obj._id)} size="sm" variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>);
  }
}