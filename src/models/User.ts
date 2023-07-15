export default class User {
  private id: String | undefined;
  private firstName: String | undefined;
  private lastName: String | undefined;
  private name: String | undefined;
  private verifiedEmail: String | undefined;
  private unverifiedEmail: String | undefined;
  private emailVerificationCode: String | undefined;
  private roles: EUserRoles[] | undefined;

  constructor(user_instance?: User) {
    if (user_instance) {
      this.id = user_instance.id;
      this.firstName = user_instance.firstName;
      this.lastName = user_instance.lastName;
      this.name = user_instance.name;
      this.verifiedEmail = user_instance.verifiedEmail;
      this.unverifiedEmail = user_instance.unverifiedEmail;
      this.emailVerificationCode = user_instance.emailVerificationCode;
      this.roles = user_instance.roles;
    }
  };

  // ! Methods
  // * Getters
  public getIdentifier(): String | undefined {
    return this.id;
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

  public getVerifiedEmail(): String | undefined {
    return this.verifiedEmail;
  }

  public getUnverifiedEmail(): String | undefined {
    return this.unverifiedEmail;
  }

  public getEmailVerificationCode(): String | undefined {
    return this.emailVerificationCode;
  }

  public getRoles(): EUserRoles[] | undefined {
    return this.roles;
  }

  // * Setters
  public setIdentifier(value: String) {
    this.id = value;
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

  public setRoles(roles: EUserRoles[] | undefined) {
    this.roles = roles;
  }
}

export enum EUserRoles {
  PROFESSOR = 'PROFESSOR',
  STUDENT = 'STUDENT',
  NONE = 'NONE'
}
