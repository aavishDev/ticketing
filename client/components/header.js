import Link from 'next/link';

export default ({ currentUser }) => {

  const links = [
    !currentUser && { label: 'Sign In', href: '/auth/sign-in' },
    !currentUser && { label: 'Sign Up', href: '/auth/sign-up' },
    currentUser && { label: 'Sign Out', href: '/auth/sign-out' }
  ]
  .filter(link => link)
  .map(({ label, href }) =>
    <li className="nav-link" key={label}>
      <Link href={href}>
        <a className="nav-item">{label}</a>
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )
}