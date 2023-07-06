import {Class} from "./Class";

export class Subject {
  // Attributes
  private id: String | undefined;
  private name: String | undefined;
  private classes: Class[] | undefined;

  // Constructor


  public constructor(subject_instance: Subject) {
    this.setName(subject_instance.getName());
    this.setIdentifier(subject_instance.getIdentifier());
    this.setClasses(subject_instance.getClasses());
  }

// Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getName(): String | undefined {
    return this.name;
  }

  public getClasses(): Class[] | undefined {
    return this.classes;
  }

  // Setters
  public setIdentifier(id: String | undefined): void {
    this.id = id;
  }

  public setName(name: String | undefined): void {
    this.name = name;
  }

  public setClasses(classes: Class[] | undefined): void {
    this.classes = classes;
  }
}
