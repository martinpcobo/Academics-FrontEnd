export class Subject {
  // Attributes
  private id: String | undefined;
  private name: String | undefined;

  // Constructor

  public constructor(subject_instance: Subject | undefined) {
    if (subject_instance) {
      this.setName(subject_instance.name);
      this.setIdentifier(subject_instance.id);
    }
  }

// Getters
  public getIdentifier(): String | undefined {
    return this.id;
  }

  public getName(): String | undefined {
    return this.name;
  }

  // Setters
  public setIdentifier(id: String | undefined): void {
    this.id = id;
  }

  public setName(name: String | undefined): void {
    this.name = name;
  }

}
