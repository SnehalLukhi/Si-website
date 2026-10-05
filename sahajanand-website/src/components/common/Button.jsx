function Button({ href = '#', children, className = '' }) {
  return (
    <a className={`button ${className}`.trim()} href={href}>
      {children}
    </a>
  )
}

export default Button
