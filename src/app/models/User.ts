export default class User {
  private identifier: String;
  private firstName?: String;
  private lastName?: String;
  private name?: String;
  private verifiedEmail: String;
  private unverifiedEmail?: String;
  private emailVerificationCode?: String;

  constructor(user_instance: User) {
    this.identifier = user_instance.identifier;
    this.firstName = user_instance.firstName;
    this.lastName = user_instance.lastName;
    this.name = user_instance.name;
    this.verifiedEmail = user_instance.verifiedEmail;
    this.unverifiedEmail = user_instance.unverifiedEmail;
    this.emailVerificationCode = user_instance.emailVerificationCode;
  };

  // ! Methods
  // * Getters
  public getIdentifier(): String {
    return this.identifier;
  }

  public getFirstName(): String | undefined {
    return this.firstName;
  }

  public getLastName(): String | undefined {
    return this.lastName;
  }

  public getName(): String | undefined {
    return this.name;
  }

  public getVerifiedEmail(): String {
    return this.verifiedEmail;
  }

  public getUnverifiedEmail(): String | undefined {
    return this.unverifiedEmail;
  }

  public getEmailVerificationCode(): String | undefined {
    return this.emailVerificationCode;
  }

  // * Setters
  public setIdentifier(value: String) {
    this.identifier = value;
  }

  public setFirstName(value: String) {
    this.firstName = value;
  }

  public setLastName(value: String) {
    this.lastName = value;
  }

  public setName(value: String) {
    this.name = value;
  }

  public setVerifiedEmail(value: String) {
    this.verifiedEmail = value;
  }

  public setUnverifiedEmail(value: String) {
    this.unverifiedEmail = value;

  }

  public setEmailVerificationCode(value: String) {
    this.emailVerificationCode = value;
  }
}
