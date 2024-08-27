import { cn } from '../utils/cn'

interface ButtonProps extends React.ComponentProps<'button'> {
  loading?: boolean
}

export const Button = ({
  content,
  loading = false,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      className,
      'btn w-full bg-naturalcycles-900 text-white border-naturalcycles-950 hover:bg-naturalcycles-950 focus:bg-naturalcycles-950 disabled:bg-gray-400 disabled:text-white',
    )}
    {...props}
  >
    {loading ? <span className="loading loading-spinner"></span> : content}
  </button>
)
