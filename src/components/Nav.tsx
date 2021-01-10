import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Nav.module.css';
import ChevronDownIcon from '../components/ChevronDownIcon';

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function updateNavbar() {
      const nav = ref.current;
      if (nav) {
        if (window.scrollY === 0) {
          if (nav.classList.contains(styles.navScrolled)) {
            nav.classList.toggle(styles.navScrolled);
          }
        } else {
          if (!nav.classList.contains(styles.navScrolled)) {
            nav.classList.toggle(styles.navScrolled);
          }
          setOpen(false);
        }
      }
    }

    window.addEventListener('scroll', updateNavbar, false);
    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  return (
    <nav
      className={
        styles.navBar +
        (open ? ' ' + styles.navBarOpen + ' ' + styles.navScrolled : '')
      }
      ref={ref}>
      <div className={styles.navContent}>
        <div className={styles.navTitle}>
          <NavLink to="/">Myel</NavLink>
        </div>
        <div className={styles.navMenu}>
          <ul
            className={
              open
                ? styles.navItems + ' ' + styles.navItemsOpen
                : styles.navItems
            }>
            <li className={styles.navBtn}>
              <NavLink
                to="/sign-up"
                activeClassName={styles.navMenuActive}
                onClick={() => setOpen(false)}>
                Request early access
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.navAction} onClick={() => setOpen(!open)}>
          <div className={styles.navChevron}>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}
