import User from "./User";
import {Course} from "./Course";

export class Professor {
  // ! Attributes
  // * Data
  private id: String | undefined;

  // * Relationship
  private courses: Course[] | undefined;

  private user: User | undefined;

  // ! Constructors

  public constructor(professor_instance: Professor) {
    this.setIdentifier(professor_instance.getIdentifier());
    this.setCourses(professor_instance.getCourses());
    this.setUser(professor_instance.getUser());
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
}
