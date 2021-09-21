import * as React from 'react';
import {Children} from 'react';
import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import NextImage from 'next/image';
import styles from './Nav.module.css';
import ChevronDownIcon from './ChevronDownIcon';

function NavLink({children, activeClassName, ...props}) {
  const {asPath} = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}

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
          <Link href="/">
            <NextImage
              src="/LogoWhite.svg"
              alt="Myel Logo"
              width={51}
              height={34}
            />
          </Link>
        </div>
        <div className={styles.navMenu}>
          <ul
            className={
              open
                ? styles.navItems + ' ' + styles.navItemsOpen
                : styles.navItems
            }>
            <li className={styles.navLink}>
              <NavLink href="/blog" activeClassName={styles.navMenuActive}>
                <a onClick={() => setOpen(false)}>blog</a>
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink href="/sign-up" activeClassName={styles.navMenuActive}>
                <a onClick={() => setOpen(false)}>run a node</a>
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
