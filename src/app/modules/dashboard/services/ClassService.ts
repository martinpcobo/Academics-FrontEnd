import {Injectable} from "@angular/core";
import {Class} from "../../../../models/Class";
import {ClassController} from "../controllers/ClassController";
import AuthenticationService from "../../../services/AuthenticationService";
import {Subject} from "../../../../models/Subject";
import {Student} from "../../../../models/Student";
import {Grade} from "../../../../models/Grade";
import ProfessorService from "./ProfessorService";
import {Professor} from "../../../../models/Professor";
import User from "../../../../models/User";
import StudentService from "./StudentService";

@Injectable()
export default class ClassService {
  constructor(
    private class_controller: ClassController,
    private authentication_service: AuthenticationService,
    private professor_service: ProfessorService,
    private student_service: StudentService
  ) {
  }

  // ! Business Logic

  // * Get all classes
  public async getAllClasses(): Promise<Class[]> {
    return new Promise<Class[]>((resolve, reject) => {
      this.class_controller.getAllClasses(this.authentication_service.getToken()).subscribe({
        next: async (classes: any[]) => {
          let classes_list: Class[] = [];

          for (const class_obj of classes) {
            let class_ind: Class = new Class(class_obj as Class);

            class_ind.setSubject(new Subject(class_obj.subject as Subject));

            let professors: Professor[] = [];
            for (const professor_id of class_obj.professors) {
              let professor: Professor = await this.professor_service.getProfessor(professor_id);
              professor.setUser(new User(professor.getUser() as User))
              professors.push(professor);
            }

            class_ind.setProfessors(professors);

            let students: Student[] = [];
            for (const student_ids of class_obj.students) {
              let student: Student = await this.student_service.getStudent(student_ids);
              student.setUser(new User(student.getUser() as User))
              students.push(student);
            }
            class_ind.setStudents(students);

            class_ind.setGrades(class_obj.grades.map((grade: any) => {
              return new Grade(grade as Grade);
            }));

            classes_list.push(class_ind);
          }

          resolve(classes_list);
        },
        error: (error: any) => {
          resolve([])
        },
      });
    })
  }

  // * Create a Class
  public async createClass(class_instance: Class): Promise<boolean> {
    class_instance.setStudents(undefined);
    class_instance.setProfessors(undefined);

    return new Promise<boolean>((resolve, reject) => {
      this.class_controller.createClass(class_instance, this.authentication_service.getToken()).subscribe({
        next: (class_instance: Class) => {
          resolve(true);
        },
        error: (error: any) => {
          reject(false);
        },
      });
    })
  }

  // * Delete a Class
  public async deleteClass(class_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.class_controller.deleteClass(class_id, this.authentication_service.getToken()).subscribe({
        next: () => {
          resolve(true);
        },
        error: (error: any) => {
          reject(false);
        },
      });
    })
  }

  // * Modify a Class
  public async modifyClass(class_instance: Class): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.class_controller.modifyClass(class_instance, this.authentication_service.getToken()).subscribe({
        next: (class_instance: Class) => {
          resolve(true);
        },
        error: (error: any) => {
          reject(false);
        },
      });
    })
  }

  // * Alter Class Professors
  public async alterClassProfessors(class_id: String, professor_ids: String[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.class_controller.alterClassProfessors(class_id, professor_ids, this.authentication_service.getToken()).subscribe({
        next: (class_instance: Class) => {
          resolve(true);
        },
        error: (error: any) => {
          reject(false);
        },
      });
    })
  }

  // * Alter Class Students
  public async alterClassStudents(class_id: String, student_ids: String[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.class_controller.alterClassStudents(class_id, student_ids, this.authentication_service.getToken()).subscribe({
        next: (class_instance: Class) => {
          resolve(true);
        },
        error: (error: any) => {
          reject(false);
        },
      });
    })
  }
}
