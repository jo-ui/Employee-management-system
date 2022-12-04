import { Component, ChangeEvent } from "react";
import EmployeeDataService from "../services/employee.service";
import IEmployeeData from "../types/employee.type";

type Props = {};

type State = IEmployeeData & {
  submitted: boolean;
};

export default class AddEmployee extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: "",
      birthdate: "",
      gender: "",
      salary: 0,
      employed: false,
      submitted: false,
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeBirthDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      birthdate: e.target.value,
    });
  }
  onChangeGender(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      gender: e.target.value,
    });
  }
  onChangeSalary(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      salary: e.target.value,
    });
  }
  saveEmployee() {
    const data: IEmployeeData = {
      name: this.state.name,
      birthdate: this.state.birthdate,
      gender: this.state.gender,
      salary: this.state.salary,
    };

    EmployeeDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          birthdate: response.data.birthdate,
          gender: response.data.gender,
          salary: response.data.salary,
          employed: response.data.employed,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      name: "",
      birthdate: "",
      gender: "",
      salary: 0,
      employed: false,
      submitted: false,
    });
  }

  render() {
    const { submitted, name, birthdate, gender, salary } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                className="form-control"
                id="birthdate"
                required
                value={birthdate}
                onChange={this.onChangeBirthDate}
                name="birthdate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                value={gender}
                required
                onChange={this.onChangeGender}
                name="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                type="number"
                className="form-control"
                id="salary"
                required
                value={salary}
                onChange={this.onChangeSalary}
                name="salary"
              />
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
