export class User {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  role: string;

  constructor(
    firstName: string = '',
    lastName: string = '',
    mail: string = '',
    password: string = '',
    role: string = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.password = password;
    this.role = role;
  }
}
