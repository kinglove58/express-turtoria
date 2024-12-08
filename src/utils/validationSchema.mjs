export const createUserValidationSchema = {
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
  },
  username: {
    in: ['body'],
    isString: {
      errorMessage: 'Username must be a string',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
  },
  displayname: {
    in: ['body'],
    isString: {
      errorMessage: 'Display name must be a string',
    },
    notEmpty: {
      errorMessage: 'Display name cannot be empty',
    },
  },
};