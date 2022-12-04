import http from "../http-common";
import IEmployeeData from "../types/employee.type";

class EmployeeDataService {
  getAll() {
    return http.get<Array<IEmployeeData>>("/employees");
  }

  get(id: string) {
    return http.get<IEmployeeData>(`/employees/${id}`);
  }

  create(data: IEmployeeData) {
    return http.post<IEmployeeData>("/employees", data);
  }

  update(data: IEmployeeData, id: any) {
    return http.put<any>(`/employees/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/employees/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/employees`);
  }

  findByName(name: string) {
    return http.get<Array<IEmployeeData>>(`/employees?name=${name}`);
  }
}

export default new EmployeeDataService();
