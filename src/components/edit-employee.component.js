import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditEmployee extends Component {
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
    this.onChangeEmployeeLastName = this.onChangeEmployeeLastName.bind(this);
    this.onChangeEmployeePosition = this.onChangeEmployeePosition.bind(this);
    this.onChangeEmployeeDepartment = this.onChangeEmployeeDepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      fname: '',
      lname: '',
      position: '',
      department: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/employees/edit-employee/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          fname: res.data.fname,
          lname: res.data.lname,
          position: res.data.position,
          department: res.data.department
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeEmployeeFirstName(e) {
    this.setState({fname: e.target.value})
  }
  onChangeEmployeeLastName(e) {
    this.setState({lname: e.target.value})
  }

  onChangeEmployeePosition(e) {
    this.setState({position: e.target.value})
  }

  onChangeEmployeeDepartment(e) {
    this.setState({department: e.target.value})
  }

  async onSubmit(e) {
    e.preventDefault()

    const employeeObject = {
      fname: this.state.fname,
      lname: this.state.lname,
      position: this.state.position,
      department: this.state.department
    };

    await axios.put('http://localhost:4000/employees/update-employee/' + this.props.match.params.id, employeeObject)
      .then((res) => {
        console.log(res.data)
        console.log('Employee successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Employee List 
    this.props.history.push('/employee-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="FName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.fname} onChange={this.onChangeEmployeeFirstName}/>
        </Form.Group>

        <Form.Group controlId="LName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.lname} onChange={this.onChangeEmployeeLastName}/>
        </Form.Group>

        <Form.Group controlId="Position">
          <Form.Label>Position</Form.Label>
          <Form.Control type="text" value={this.state.position} onChange={this.onChangeEmployeePosition}/>
        </Form.Group>

        <Form.Group controlId="Department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={this.state.department} onChange={this.onChangeEmployeeDepartment}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Employee
        </Button>
      </Form>
    </div>);
  }
}



