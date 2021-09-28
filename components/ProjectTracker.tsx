import NextImage from 'next/image';
import {useState} from 'react';
import useSWR from 'swr';
import {
  ListboxInput,
  ListboxOption,
  ListboxList,
  ListboxPopover,
  ListboxButton,
} from '@reach/listbox';
import {getCollisions} from '@reach/popover';
import styles from '../pages/Home.module.css';
import Octocat from './Octocat';

const ghFetcher = (root: string, params?: any) => {
  let url = 'https://api.github.com/repos/myelnet/pop/' + root;
  if (params) {
    url = url + '?' + new URLSearchParams(params);
  }
  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github.inertia-preview+json',
      // this token can only read public repos
      Authorization: 'token ' + process.env.NEXT_PUBLIC_GH_TOKEN,
    },
  }).then((res) => res.json());
};

const params = ['projects', {state: 'all'}];

const wip = /(WIP)/;

const getStateOrder = (p: any) => {
  if (p.state === 'closed') {
    return 1;
  } else if (wip.test(p.name)) {
    return 2;
  }
  return 3;
};

const popoverPos = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }
  const space = 8;

  const {directionUp} = getCollisions(targetRect, popoverRect);
  return {
    width: targetRect.width,
    left: targetRect.left,
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset + space}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset + space}px`,
  };
};

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none">
      <path
        d="M1 0.999999L7.5 7L14 0.999999"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default function ProjectTracker() {
  const [filter, setFilter] = useState('all');
  const {data: projects = []} = useSWR(params, ghFetcher);

  const list = !Array.isArray(projects)
    ? []
    : projects
        .sort((pa, pb) => getStateOrder(pb) - getStateOrder(pa))
        .filter((p) => {
          switch (filter) {
            case 'complete':
              return p.state === 'closed';
            case 'inprogress':
              return p.state === 'open' && wip.test(p.name);
            case 'planned':
              return p.state === 'open' && !wip.test(p.name);
            case 'all':
            default:
              return true;
          }
        });

  let prog = 0,
    comp = 0,
    plan = 0;
  projects.forEach((p) =>
    p.state === 'closed'
      ? comp++
      : p.state === 'open' && wip.test(p.name)
      ? prog++
      : plan++
  );

  return (
    <div className={styles.frameContent}>
      <div className={styles.frametop}>
        <div className={styles.frametopHead}>
          <div className={styles.frametopCorner}>
            <a href="https://github.com/myelnet/pop/projects" target="_blank">
              <div className={styles.ghlogo}>
                <Octocat />
              </div>
            </a>
          </div>
          <div className={styles.frametopCenter}></div>
          <div className={styles.frametopPadding}>
            <ListboxInput value={filter} onChange={setFilter}>
              <ListboxButton>
                {filter}
                <ArrowDown />
              </ListboxButton>
              <ListboxPopover position={popoverPos}>
                <ListboxList>
                  <ListboxOption value="planned">
                    <span className={styles.optplanned}>planned</span>
                    <span className={styles.count}>({plan})</span>
                  </ListboxOption>
                  <ListboxOption value="inprogress">
                    <span className={styles.optprogress}>in progress</span>
                    <span className={styles.count}>({prog})</span>
                  </ListboxOption>
                  <ListboxOption value="complete">
                    <span className={styles.optcomplete}>complete</span>
                    <span className={styles.count}>({comp})</span>
                  </ListboxOption>
                  <ListboxOption value="all">
                    <span className={styles.optdefault}>all</span>
                    <span className={styles.count}>({projects.length})</span>
                  </ListboxOption>
                </ListboxList>
              </ListboxPopover>
            </ListboxInput>
          </div>
        </div>
      </div>
      <ul className={styles.framelistmax}>
        {list.map((p) => (
          <li key={p.id}>
            <a
              href={'https://github.com/myelnet/pop/projects/' + p.number}
              target="_blank"
              className={styles.framelistitem}>
              <div className={styles.itemtodo}>
                <h3>{p.name.replace(/\(WIP\)/, '')}</h3>
                <p>{p.body}</p>
              </div>
              <div className={styles.itemtag}>
                {p.state === 'closed' ? (
                  <span className={styles.tagcomplete}>complete</span>
                ) : wip.test(p.name) ? (
                  <span className={styles.tagprogress}>in progress</span>
                ) : (
                  <span className={styles.tagplanned}>planned</span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
