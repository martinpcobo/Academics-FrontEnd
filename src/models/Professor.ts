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

  public constructor(professor_instance: Professor | undefined) {
    if(professor_instance) {
      this.setIdentifier(professor_instance.id);
      this.setCourses(professor_instance.courses);
      this.setUser(professor_instance.user);
    }
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
    this.user = user;
  }
}
