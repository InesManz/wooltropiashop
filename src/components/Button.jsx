import { Link } from 'react-router-dom'

// Boton reutilizable con variantes de marca.
// Puede renderizar <button>, o un <Link> si se pasa `to`, o <a> si se pasa `href`.
const VARIANTS = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-container shadow-ambient',
  outline:
    'bg-transparent border border-secondary text-secondary hover:bg-surface-container-low',
  ghost: 'bg-transparent text-primary hover:bg-surface-container-low',
}

const SIZES = {
  md: 'h-12 px-6 text-sm',
  sm: 'h-10 px-4 text-xs',
  lg: 'h-14 px-8 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl label transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
