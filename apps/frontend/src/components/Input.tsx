import clsx from 'clsx'
import type {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'

interface InputProps<T extends FieldValues>
  extends React.ComponentProps<'input'> {
  register: UseFormRegister<T>
  error: FieldError | undefined
  name: Path<T> // Ensures the name is a valid key of T and a string
  title: string
}

export const Input = <T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  title,
}: InputProps<T>) => (
  <label className="form-control w-full">
    <div className="label py-1">
      <span className="label-text text-primary">{title}</span>
    </div>
    <input
      className={clsx(
        'input input-bordered border-naturalcycles-900 focus:border-naturalcycles-900 focus:outline-naturalcycles-900 w-full ',
        error && 'input-error',
      )}
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
    <div className="label h-6 py-0">
      {error && (
        <span className="label-text-alt text-red-700">{error.message}</span>
      )}
    </div>
  </label>
)
