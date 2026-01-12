export const ERROR_MESSAGE = {
  repeatedEmail: 'This email has already been taken',
  invalidStatus: 'The status is not one of ACTIVE/INACTIVE/SUSPENDED',
  invalidEmail: 'The email is not in a valid format',
  invalidRole: 'Role must be one of USER/ADMIN',
  invalidDate: 'Date is not in a valid format',
  userNotFound: 'User with this ID not found',
  invalidName: 'Name is not between 2 and 100 characters',
  invalidDates: 'Dates are not valid',
  idNotProvided: 'Please provide the ID for the user',
};

export const ERROR_CODE = {
  repeatedEmail: 409,
  invalidStatus: 400,
  invalidEmail: 400,
  invalidRole: 400,
  invalidDate: 400,
  userNotFound: 404,
  invalidName: 400,
  invalidDates: 400,
  idNotProvided: 400,
};
