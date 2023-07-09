import {Course} from "./Course";
import {Subject} from "./Subject";

export class Class extends Course {
  // ! Attributes
  // * Relationships
  private subject: Subject | undefined;

  // ! Constructors

  public constructor(class_instance: Class | undefined) {
    if (class_instance) {
      super(class_instance);
      this.setSubject(class_instance.subject);
    } else {
      super(undefined);
    }
  }

  // ! Methods
  // * Getters
  public getSubject(): Subject | undefined {
    return this.subject;
  }

  // * Setters
  public setSubject(subject_instance: Subject | undefined): void {
    this.subject = subject_instance;
  }
}
