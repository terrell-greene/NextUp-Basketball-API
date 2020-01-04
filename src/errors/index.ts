import { createError } from 'apollo-errors'

export const ServerError = createError('ServerError', {
  message: 'Server error encountered'
})

export const AuthorizationError = createError('AuthorizationError', {
  message: 'Not authorized!'
})

export const EmailScalarError = createError('Invalid Email', {
  message: 'Expected type Email!'
})

export const PasswordScalarError = createError('Invalid Password', {
  message: 'Expected type Password!'
})

export const SignUpError = createError('SignUpError', {
  message: 'Signup error encountered'
})

export const LoginError = createError('LoginError', {
  message: 'Login error encountered'
})

export const LogoutError = createError('LogoutError', {
  message: 'Logout error encountered'
})

export const UpdateUserError = createError('UpdateUserError', {
  message: 'UpdateUser error encountered'
})

export const CreateSessionError = createError('CreateSessionError', {
  message: 'CreateSession error encountered'
})

export const UpdateSessionError = createError('UpdateSessionError', {
  message: 'UpdateSession error encountered'
})

export const JoinSessionError = createError('JoinSessionError', {
  message: 'JoinSession error encountered'
})

export const UnjoinSessionError = createError('UnjoinSessionError', {
  message: 'UnjoinSession error encountered'
})

export const DeleteSuggestedCourtError = createError(
  'DeleteSuggestedCourtError',
  {
    message: 'DeleteSuggestedCourtError error encountered'
  }
)

export const CreateCourtError = createError('CreateCourtError', {
  message: 'CreateCourtError error encountered'
})
