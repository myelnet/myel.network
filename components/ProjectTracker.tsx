import NextImage from 'next/image';
import {useState} from 'react';
import useSWR from 'swr';
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

  return (
    <div className={styles.frameContent}>
      <div className={styles.frametop}>
        <div className={styles.frametopHead}>
          <div className={styles.frametopCorner}>
            <a href="https://github.com/myelnet/pop/projects">
              <div className={styles.ghlogo}>
                <Octocat />
              </div>
            </a>
          </div>
          <div className={styles.frametopCenter}></div>
          <select
            name="filter"
            className={styles.selector}
            onChange={(evt) => setFilter(evt.target.value)}>
            <option value="all">all</option>
            <option value="planned">planned</option>
            <option value="inprogress">in progress</option>
            <option value="complete">complete</option>
          </select>
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
                <h3>{p.name}</h3>
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
      <div className={styles.framebottom}>
        <a href="https://github.com/myelnet/pop/issues" className={styles.btn}>
          contribute
        </a>
      </div>
    </div>
  );
}
