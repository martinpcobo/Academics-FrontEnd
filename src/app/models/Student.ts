import User from "./User";
import {Course} from "./Course";
import {Grade} from "./Grade";

export class Student {
  // ! Attributes
  // * Data
  private id: String | undefined;

  // * Relationships
  private courses: Course[] | undefined;
  private grades: Grade[] | undefined;
  private user: User | undefined;

  // ! Constructors
  public constructor(student_instance: Student) {
    this.setIdentifier(student_instance.getIdentifier());
    this.setCourses(student_instance.getCourses());
    this.setUser(student_instance.getUser());
    this.setGrades(student_instance.getGrades());
  }

// ! Methods
// * Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getCourses(): Course[] | undefined {
    return this.courses;
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public getGrades(): Grade[] | undefined {
    return this.grades;
  }

// * Setters
  public setIdentifier(id: String | undefined): void {
    this.id = id;
  }

  public setCourses(courses: Course[] | undefined): void {
    this.courses = courses;
  }

  public setUser(user: User | undefined): void {
    if (this.user != null && this.user.getIdentifier() == user?.getIdentifier()) return;

    this.user = user;
  }

  public setGrades(grade_list: Grade[] | undefined): void {
    this.grades = grade_list;
  }
}
