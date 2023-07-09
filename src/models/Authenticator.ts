export default class Authenticator {
  // ! Attributes
  private id: String;
  private name?: String | undefined;
  private public_key?: String | undefined;
  private authenticatorId?: String | undefined;
  private signature_count?: String | undefined;
  private aaguid?: String | undefined;

  // ! Constructor
  public constructor(authenticator_instance: Authenticator) {
    this.id = authenticator_instance.id;
    this.name = authenticator_instance.name;
    this.public_key = authenticator_instance.public_key;
    this.authenticatorId = authenticator_instance.authenticatorId;
    this.signature_count = authenticator_instance.signature_count;
    this.aaguid = authenticator_instance.aaguid;
  }

  // ! Methods
  // * Getters
  public getIdentifier(): String {
    return this.id;
  }

  public getName(): String | undefined {
    return this.name;
  }

  public getPublicKey(): String | undefined {
    return this.public_key;
  }

  public getAuthenticatorId(): String | undefined {
    return this.authenticatorId;
  }

  public getSignatureCount(): String | undefined {
    return this.signature_count;
  }

  public getAaguid(): String | undefined {
    return this.aaguid;
  }

  // * Setters

  public setIdentifier(value: String) {
    this.id = value;
  }

  public setName(value: String | undefined) {
    this.name = value;
  }

  public setPublicKey(value: String | undefined) {
    this.public_key = value;
  }

  public setAuthenticatorId(value: String | undefined) {
    this.authenticatorId = value;
  }

  public setSignatureCount(value: String | undefined) {
    this.signature_count = value;
  }

  public setAaguid(value: String | undefined) {
    this.aaguid = value;
  }
}

