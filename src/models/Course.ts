import {Student} from "./Student";
import {Professor} from "./Professor";
import {Grade} from "./Grade";

export class Course {
  // ! Attributes
  // * Data
  private id: String | undefined;
  private startDate: Date | undefined;
  private endDate: Date | undefined;
  private name: String | undefined;
  private description: String | undefined;

  // * Relationships
  private professors: Professor[] | undefined;
  private students: Student[] | undefined;
  private grades: Grade[] | undefined;

  // ! Constructors

  public constructor(course_instance: Course | undefined) {
    if (course_instance) {
      this.setIdentifier(course_instance.id);
      this.setStudents(course_instance.students);
      this.setProfessors(course_instance.professors);
      this.setEndDate(course_instance.endDate);
      this.setStartDate(course_instance.startDate);
      this.setDescription(course_instance.description);
      this.setName(course_instance.name);
      this.setGrades(course_instance.grades);
    }
  }

// ! Methods
// * Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getName(): String | undefined {
    return this.name;
  }

  public getDescription(): String | undefined {
    return this.description;
  }

  public getStartDate(): Date | undefined {
    return this.startDate;
  }

  public getEndDate(): Date | undefined {
    return this.endDate;
  }

  public getProfessors(): Professor[] | undefined {
    return this.professors;
  }

  public getStudents(): Student[] | undefined {
    return this.students;
  }

  public getGrades(): Grade[] | undefined {
    return this.grades;
  }

// * Setters
  public setIdentifier(course_id: String | undefined): void {
    this.id = course_id;
  }

  public setName(name: String | undefined): void {
    this.name = name;
  }

  public setDescription(description: String | undefined): void {
    this.description = description;
  }

  public setStartDate(start_date: Date | undefined): void {
    this.startDate = start_date;
  }

  public setEndDate(end_date: Date | undefined): void {
    this.endDate = end_date;
  }

  public setProfessors(professors_list: Professor[] | undefined): void {
    this.professors = professors_list;
  }

  public setStudents(student_list: Student[] | undefined): void {
    this.students = student_list;
  }

  public setGrades(grade_list: Grade[] | undefined): void {
    this.grades = grade_list;
  }
}
