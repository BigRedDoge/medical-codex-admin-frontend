import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" passHref>
            <span className={styles.navLink}>Home</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about" passHref>
            <span className={styles.navLink}>About</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin" passHref>
            <span className={styles.navLink}>Admin</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/help" passHref>
            <span className={styles.navLink}>Help</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
