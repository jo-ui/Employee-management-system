import { Component, ChangeEvent } from "react";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
import IEmployeeData from "../types/employee.type";

type Props = {};

type State = {
  employees: Array<IEmployeeData>;
  currentEmployee: IEmployeeData | null;
  currentIndex: number;
  searchName: string;
};

export default class EmployeesList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveEmployees() {
    EmployeeDataService.getAll()
      .then((response: any) => {
        this.setState({
          employees: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
    });
  }

  setActiveEmployee(employee: IEmployeeData, index: number) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
    });
  }

  removeAllEmployees() {
    EmployeeDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
    });

    EmployeeDataService.findByName(this.state.searchName)
      .then((response: any) => {
        this.setState({
          employees: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, employees, currentEmployee, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Employees List</h4>

          <ul className="list-group">
            {employees &&
              employees.map((employee: IEmployeeData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEmployee(employee, index)}
                  key={index}
                >
                  {employee.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentEmployee ? (
            <div>
              <h4>Employee</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEmployee.name}
              </div>
              <div>
                <label>
                  <strong>Birth Date:</strong>
                </label>{" "}
                {currentEmployee.birthdate}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentEmployee.gender}
              </div>
              <div>
                <label>
                  <strong>Salary:</strong>
                </label>{" "}
                {currentEmployee.salary}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEmployee.employed ? "Employed" : "Discharged"}
              </div>

              <Link
                to={"/employees/" + currentEmployee.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Employee...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
