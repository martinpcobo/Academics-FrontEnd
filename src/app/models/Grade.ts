import {Course} from "./Course";
import {Student} from "./Student";

export class Grade {
  // ! Attributes
  // * Data
  private id: String | undefined;
  private value: Number | undefined

  // * Relationships
  private course: Course | undefined;

  private student: Student | undefined;

  // ! Constructor

  public constructor(grade_instance: Grade) {
    this.setIdentifier(grade_instance.getIdentifier());
    this.setCourse(grade_instance.getCourse());
    this.setStudent(grade_instance.getStudent());
    this.setValue(grade_instance.getValue());
  }

// ! Methods
// * Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getCourse(): Course | undefined {
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

  public setCourse(course: Course | undefined): void {
    this.course = course;
  }

  public setStudent(student: Student | undefined): void {
    this.student = student;
  }

  public setValue(value: Number | undefined): void {
    this.value = value;
  }
}
