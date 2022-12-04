import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import EmployeeDataService from "../services/employee.service";
import IEmployeeData from "../types/employee.type";

interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentEmployee: IEmployeeData;
  message: string;
};

export default class Employee extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateEmployed = this.updateEmployed.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      currentEmployee: {
        id: null,
        name: "",
        birthdate: "",
        gender: "",
        salary: 0,
        employed: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          name: name,
        },
      };
    });
  }

  onChangeBirthDate(e: ChangeEvent<HTMLInputElement>) {
    const birthdate = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        birthdate: birthdate,
      },
    }));
  }

  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        gender: gender,
      },
    }));
  }

  onChangeSalary(e: ChangeEvent<HTMLInputElement>) {
    const salary = e.target.value;

    this.setState((prevState) => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        salary: salary,
      },
    }));
  }

  getEmployee(id: string) {
    EmployeeDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentEmployee: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateEmployed(status: boolean) {
    const data: IEmployeeData = {
      id: this.state.currentEmployee.id,
      name: this.state.currentEmployee.name,
      birthdate: this.state.currentEmployee.birthdate,
      gender: this.state.currentEmployee.gender,
      salary: this.state.currentEmployee.salary,
      employed: status,
    };

    EmployeeDataService.update(data, this.state.currentEmployee.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentEmployee: {
            ...prevState.currentEmployee,
            employed: status,
          },
          message: "The status was updated successfully!",
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee,
      this.state.currentEmployee.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The employee was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteEmployee() {
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/employees");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentEmployee.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthdate">Birth Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="birthdate"
                  value={currentEmployee.birthdate}
                  onChange={this.onChangeBirthDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentEmployee.gender}
                  onChange={this.onChangeGender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  value={currentEmployee.salary}
                  onChange={this.onChangeSalary}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEmployee.employed ? "Employed" : "Discharged"}
              </div>
            </form>

            {currentEmployee.employed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEmployed(false)}
              >
                Discharged
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateEmployed(true)}
              >
                Employed
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Employee...</p>
          </div>
        )}
      </div>
    );
  }
}
