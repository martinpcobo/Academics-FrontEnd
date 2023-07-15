import {Injectable} from "@angular/core";
import AuthenticationService from "../../../services/AuthenticationService";
import {Grade} from "../../../../models/Grade";
import StudentService from "./StudentService";
import {GradeController} from "../controllers/GradeController";
import ClassService from "./ClassService";

@Injectable()
export default class GradeService {
  constructor(
    private grade_controller: GradeController,
    private authentication_service: AuthenticationService,
    private student_service: StudentService,
    private class_service: ClassService,
  ) {
  }

  // ! Business Logic

  // * Get Grades from Course
  public async getGradesFromCourse(course_id: String): Promise<Grade[] | undefined> {
    return new Promise<Grade[]>((resolve, reject) => {
      this.grade_controller.getGradesFromCourse(course_id, this.authentication_service.getToken()).subscribe({
        next: async (grade_obj_list: any[]) => {
          let grade_instances: Grade[] = [];
          for (let grade_obj of grade_obj_list) {
            console.log(grade_obj);
            let grade_instance: Grade = new Grade(grade_obj);
            grade_instance.setStudent(await this.student_service.getStudent(grade_obj.student));
            grade_instance.setValue(grade_obj.value);
            grade_instance.setClass(await this.class_service.getClassById(grade_obj.course));
            grade_instances.push(grade_instance);
          }

          resolve(grade_instances);
        }, error: (error: any) => {
          reject(error);
        }
      })
    });
  }

  // * Get Grades from Student
  public async getGradesFromStudent(student_id: String): Promise<Grade[]> {
    return new Promise<Grade[]>((resolve, reject) => {
      this.grade_controller.getGradesFromStudent(student_id, this.authentication_service.getToken()).subscribe({
        next: async (grade_obj_list: any[]) => {
          let grade_instances: Grade[] = [];
          for (let grade_obj of grade_obj_list) {
            let grade_instance: Grade = new Grade(grade_obj);
            grade_instance.setStudent(undefined);
            grade_instance.setValue(grade_obj.value);
            grade_instance.setClass(await this.class_service.getClassById(grade_obj.course));
            grade_instances.push(grade_instance);
          }

          resolve(grade_instances);
        }, error: (error: any) => {
          reject(error);
        }
      })
    });
  }

  // * Get Grade by Id
  public async getGradeById(grade_id: String): Promise<Grade> {
    return new Promise<Grade>((resolve, reject) => {
      this.grade_controller.getGradeById(grade_id, this.authentication_service.getToken()).subscribe({
        next: async (grade_obj: any) => {
          let grade_instance: Grade = new Grade(grade_obj);
          grade_instance.setStudent(await this.student_service.getStudent(grade_obj.student));
          grade_instance.setValue(grade_obj.value);
          grade_instance.setClass(await this.class_service.getClassById(grade_obj.course));
          resolve(grade_instance);
        }, error: (error: any) => {
          reject(error);
        }
      })
    });
  }

  // * Create Grade
  public async createGrade(grade: Grade): Promise<boolean> {
    grade.getStudent()?.setUser(undefined);
    return new Promise<boolean>((resolve, reject) => {
      this.grade_controller.createGrade(grade, this.authentication_service.getToken()).subscribe({
        next: () => {
          resolve(true);
        }, error: (error: any) => {
          reject(false);
        }
      });
    });
  }

  // * Delete Grade By Id
  public async deleteGradeById(grade_id: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.grade_controller.deleteGradeById(grade_id, this.authentication_service.getToken()).subscribe({
        next: () => {
          resolve(true);
        }, error: (error: any) => {
          reject(false);
        }
      });
    });
  }

}
