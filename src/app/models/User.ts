export default class User {
  private id?: String;
  private firstName?: String;
  private lastName?: String;
  private name?: String;
  private verifiedEmail?: String;
  private unverifiedEmail?: String;
  private emailVerificationCode?: String;

  public constructor() {
  };

  // ! Methods
  // * Getters
  public get getId(): String | undefined {
    return this.id;
  }

  public get getFirstName(): String | undefined {
    return this.firstName;
  }

  public get getLastName(): String | undefined {
    return this.lastName;
  }

  public get getName(): String | undefined {
    return this.name;
  }

  public get getVerifiedEmail(): String | undefined {
    return this.verifiedEmail;
  }

  public get getUnverifiedEmail(): String | undefined {
    return this.unverifiedEmail;
  }

  public get getEmailVerificationCode(): String | undefined {
    return this.emailVerificationCode;
  }

  // * Setters
  public set setId(value: String) {
    this.id = value;
  }

  public set setFirstName(value: String) {
    this.firstName = value;
  }

  public set setLastName(value: String) {
    this.lastName = value;
  }

  public set setName(value: String) {
    this.name = value;
  }

  public set setVerifiedEmail(value: String) {
    this.verifiedEmail = value;
  }

  public set setUnverifiedEmail(value: String) {
    this.unverifiedEmail = value;

  }

  public set setEmailVerificationCode(value: String) {
    this.emailVerificationCode = value;
  }
}
