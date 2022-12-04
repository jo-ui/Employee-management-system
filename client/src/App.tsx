import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logo from "./addis_sw.jpg";

import AddEmployee from "./components/add-employee.component";
import Employee from "./components/employee.component";
import EmployeesList from "./components/employees-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <img alt="logo" src={Logo} />
          <Link to={"/employees"} className="navbar-brand">
            Addis Software EMS
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/employees"]} component={EmployeesList} />
            <Route exact path="/add" component={AddEmployee} />
            <Route path="/employees/:id" component={Employee} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
