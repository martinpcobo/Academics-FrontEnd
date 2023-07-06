import {Course} from "./Course";
import {Subject} from "./Subject";

export class Class extends Course {
  // ! Attributes
  // * Relationships
  private subject: Subject | undefined;

  // ! Constructors

  public constructor(class_instance: Class) {
    super(class_instance);
    this.setIdentifier(class_instance.getIdentifier());
    this.setSubject(class_instance.getSubject());
  }

  // ! Methods
  // * Getters
  public getSubject(): Subject | undefined {
    return this.subject;
  }

  // * Setters
  public setSubject(subject_instance: Subject | undefined): void {
    if (this.subject != null && this.subject.getIdentifier() == subject_instance?.getIdentifier()) return;
    this.subject = subject_instance;
  }
}
