export default class AuthLoginDetails {
  // ! Attributes
  private username?: String;
  private authenticatorName?: String;
  private publicKey?: String;
  private password?: String;

  // ! Constructors
  public constructor() {
  }

  // ! Methods
  // * Getters
  public getUsername(): String | undefined {
    return this.username;
  }

  public getAuthenticatorName(): String | undefined {
    return this.authenticatorName;
  }

  public getPublicKey(): String | undefined {
    return this.publicKey;
  }

  public getPassword(): String | undefined {
    return this.password;
  }

  // * Setters
  public setUsername(username: String | undefined): void {
    this.username = username;
  }

  public setAuthenticatorName(authenticator_name: String | undefined): void {
    this.authenticatorName = authenticator_name;
  }

  public setPublicKey(public_key: String | undefined): void {
    this.publicKey = public_key;
  }

  public setPassword(password: String | undefined): void {
    this.password = password;
  }
}
