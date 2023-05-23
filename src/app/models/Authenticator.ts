export default class Authenticator {
  // ! Attributes
  private id?: String | undefined;
  private name?: String | undefined;
  private public_key?: String | undefined;
  private authenticatorId?: String | undefined;
  private signature_count?: String | undefined;
  private aaguid?: String | undefined;

  // ! Constructor
  public constructor() {
  }

  // ! Methods
  // * Getters
  public get getId(): String | undefined {
    return this.id;
  }

  public get getName(): String | undefined {
    return this.name;
  }

  public get getPublicKey(): String | undefined {
    return this.public_key;
  }

  public get getAuthenticatorId(): String | undefined {
    return this.authenticatorId;
  }

  public get getSignatureCount(): String | undefined {
    return this.signature_count;
  }

  public get getAaguid(): String | undefined {
    return this.aaguid;
  }

  // * Setters

  public set setId(value: String | undefined) {
    this.id = value;
  }

  public set setName(value: String | undefined) {
    this.name = value;
  }

  public set setPublicKey(value: String | undefined) {
    this.public_key = value;
  }

  public set setAuthenticatorId(value: String | undefined) {
    this.authenticatorId = value;
  }

  public set setSignatureCount(value: String | undefined) {
    this.signature_count = value;
  }

  public set setAaguid(value: String | undefined) {
    this.aaguid = value;
  }
}

