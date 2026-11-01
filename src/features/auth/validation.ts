export interface AuthFields { email: string; password: string; confirmation: string; first_name: string }
export type AuthFieldErrors = Partial<Record<keyof AuthFields, string[]>>
export function validateAuth(fields: AuthFields, registration: boolean): AuthFieldErrors {
  const errors: AuthFieldErrors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = ['Укажите корректный email.']
  if (!fields.password) errors.password = ['Введите пароль.']
  if (registration && !fields.confirmation) errors.confirmation = ['Повторите пароль.']
  else if (registration && fields.password !== fields.confirmation) errors.confirmation = ['Пароли не совпадают.']
  if (registration && fields.first_name.length > 150) errors.first_name = ['Имя должно содержать не более 150 символов.']
  return errors
}
