function Button({ onClick, superAdminId }) {
  return <button onClick={() => onClick(superAdminId)}>-</button>;
}

export default Button;
