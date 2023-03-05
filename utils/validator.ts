type Target = Record<
  string,
  string | number | boolean | Date | Array<Target> | null
>
type Value = string | number | boolean | Date | Array<Target>
type Validators = Record<string, (arg: Value) => true | string>
// 関数を返す関数
// type Validator = (fieldName: string) => (value: Value) => true | string

export const useValidate = (target: Target, validators: Validators) => {
  let errorMessage = ''
  for (const key in target) {
    if (!validators[key]) continue
    const result = validators[key](target[key])
    if (typeof result === 'string') {
      errorMessage += result + '\n'
    }
  }
  return errorMessage
}

export const validators: Record<string, Function> = {
  requiredForText: (fieldName: string) => {
    return (value: string) => {
      if (value) return true
      return fieldName + 'は必須項目です。'
    }
  },
  requredForDate: (fieldName: string) => {
    return (value: Date) => {
      if (value) return true
      return fieldName + 'は必須項目です。'
    }
  },
  requiredForArray: (fieldName: string) => {
    return <T>(value: Array<T>) => {
      if (value.length === 0) return fieldName + 'は必須項目です。'
      return true
    }
  },
}
