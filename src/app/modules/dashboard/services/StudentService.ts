import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {Student} from "../../../../models/Student";
import {StudentController} from "../controllers/StudentController";
import User from "../../../../models/User";
import {Grade} from "../../../../models/Grade";

@Injectable()
export default class StudentService {
  constructor(
    private student_controller: StudentController,
    private authentication_service: AuthenticationService
  ) {
  }

  // ! Business Logic

  // * Get all Students
  public async getAllStudents(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      this.student_controller.getAllStudents(this.authentication_service.getToken()).subscribe({
        next: (students: Object[]) => {
          resolve(students.map((student: any) => {
            let student_instance: Student = new Student(student as Student);
            student_instance.setUser(new User(student.user as User));
            student_instance.setGrades(student_instance.getGrades()?.map((grade_obj: Object) => {
              return new Grade(grade_obj as Grade);
            }))
            return student_instance;
          }))
        },
        error: (error: any) => {
          resolve([])
        },
      });
    })
  }

  // * Get a Student
  public async getStudent(student_id: string): Promise<Student> {
    return new Promise<Student>((resolve, reject) => {
      this.student_controller.getStudent(student_id, this.authentication_service.getToken()).subscribe({
        next: (student: any) => {
          let student_instance: Student = new Student(student as Student);
          student_instance.setUser(new User(student.user as User));
          student_instance.setGrades(student_instance.getGrades()?.map((grade_obj: Object) => {
            return new Grade(grade_obj as Grade);
          }))
          resolve(student_instance);
        },
        error: (error: any) => {
          resolve(error);
        },
      });
    })
  }

}
