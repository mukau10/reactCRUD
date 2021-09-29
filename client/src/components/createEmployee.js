import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/createEmployee.css'

export default function CreateEmployee (){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    function addEmployee() {
      Axios.post('http://localhost:5000/create', {
        firstName: firstName,
        lastName: lastName,
        age: age,
        country: country,
        position: position,
        wage: wage
      }).then(() => {
        setEmployeeList([...employeeList, {
          firstName: firstName,
          lastName: lastName,
          age: age,
          country: country,
          position: position,
          wage: wage
        }])
        console.log("succes")
      })
    }

    function getEmployees() {
      Axios.get('http://localhost:5000/api').then((response) => {
        setEmployeeList(response.data)
      })
    }

    useEffect(() => {
      getEmployees()
    }, [employeeList]);

    return (
      <div className="App">
        <div className="information">
          <label>First Name: </label>
          <input type="text" onChange={(event) => { setFirstName(event.target.value) }}></input>
          <label>Last Name: </label>
          <input type="text" onChange={(event) => { setLastName(event.target.value) }}></input>
          <label>Age: </label>
          <input type="number" onChange={(event) => { setAge(event.target.value) }}></input>
          <label>Country: </label>
          <input type="text" onChange={(event) => { setCountry(event.target.value) }}></input>
          <label>Position: </label>
          <input type="text" onChange={(event) => { setPosition(event.target.value) }}></input>
          <label>Wage (year): </label>
          <input type="number" onChange={(event) => { setWage(event.target.value) }}></input>
          <button className="normalButton" type="submit" onClick={addEmployee}>Add Employee</button>
        </div>
            -----------------------------------------------------------------------------------------------------------------------------------
        <button className="normalButton" onClick={getEmployees}>Show employees</button>
        {employeeList.map((val, key) => {
          return <div className="employeeBox" key={key}>
            <h3 key={key.id}>FirstName: {val.firstName}</h3>
            <p key={key.id}>LastName: {val.lastName}</p>
            <p key={key.id}>Age: {val.age}</p>
            <p key={key.id}>Country: {val.country}</p>
            <p key={key.id}>Position: {val.position}</p>
            <p key={key.id}>Salary per year: {val.wage}</p>
            <Button variant="secondary">Delete</Button>{' '}
          </div>
        })}
      </div>
    );
  }
