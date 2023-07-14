import {Course} from "./Course";
import {Student} from "./Student";
import {Class} from "./Class";

export class Grade {
  // ! Attributes
  // * Data
  private id: String | undefined;
  private value: Number | undefined

  // * Relationships
  private course: Class | undefined;

  private student: Student | undefined;

  // ! Constructor

  public constructor(grade_instance: Grade | undefined) {
    if(grade_instance) {
      this.setIdentifier(grade_instance.id);
      this.setClass(grade_instance.course);
      this.setStudent(grade_instance.student);
      this.setValue(grade_instance.value);
    }
  }

// ! Methods
// * Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getCourse(): Class | undefined {
    return this.course;
  }

  public getStudent(): Student | undefined {
    return this.student;
  }

  public getValue(): Number | undefined {
    return this.value;
  }

// * Setters
  public setIdentifier(id: String | undefined): void {
    this.id = id;
  }

  public setClass(course: Class | undefined): void {
    this.course = course;
  }

  public setStudent(student: Student | undefined): void {
    this.student = student;
  }

  public setValue(value: Number | undefined): void {
    this.value = value;
  }
}
