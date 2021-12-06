import {useState} from 'react';
import {Multiaddr} from 'multiaddr';
import {Content, Peer} from './Uploader';
import styles from '../pages/Home.module.css';
import humanFileSize from '../utils/humanFileSize';
import Spinner from './Spinner';
import Modal from './Modal';
import {peerAddr} from '../utils/usePeers';

type RetrieverProps = {
  peers: Peer[];
  content: Content[];
};

type ContentEntry = {
  name: string;
  size: number;
  hash: string;
};

const WORKER_URL = 'https://client.myel.workers.dev/';

export default function Retriever({peers, content}) {
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<ContentEntry[]>(null);
  const [selected, setSelected] = useState<Content>(null);
  const peermap = peers.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});
  const clist: Content[] = content
    .filter((c) => !!peermap[new Multiaddr(c.peer).getPeerId()])
    .map((c) => {
      const peer = {
        id: new Multiaddr(c.peer).getPeerId(),
        name: c.peer.split('/')[2],
      };

      return {...c, peer: peerAddr(peer)};
    });
  const retrieve = async (content: Content) => {
    try {
      setLoading(true);
      const entries = await fetch(
        WORKER_URL + content.hash + '?peer=' + content.peer,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      ).then((res) => res.json());
      setSelected(content);
      setEntries(entries);
    } catch (e) {
      console.log(e);
    }
  };
  const reset = () => {
    setEntries(null);
    setSelected(null);
    setLoading(false);
  };
  return (
    <>
      <div className={styles.framescroll}>
        {clist.length ? (
          <u className={styles.framescroller}>
            {clist.map((c) => (
              <li
                key={c.hash + c.peer}
                className={styles.contentRow}
                onClick={() => retrieve(c)}>
                <div className={styles.peerHeading}>
                  <div>
                    {c.hash.slice(0, 8)}...{c.hash.slice(-8)}
                  </div>
                  <div>{humanFileSize(c.size)}</div>
                </div>
                <div className={styles.peerData}>...{c.peer.slice(-8)}</div>
              </li>
            ))}
          </u>
        ) : (
          <div className={styles.contentRow}>
            <p className={styles.fineprint}>No content yet</p>
          </div>
        )}
        {loading && (
          <div className={styles.frameoverlay}>
            <Spinner />
          </div>
        )}
      </div>
      <div className={styles.framebottom}>
        <p className={styles.fineprint}>
          {loading ? 'Downloading...' : 'Your file will download automatically'}
        </p>
      </div>
      <Modal actionTitle="Download" isOpen={!!entries} onDismiss={reset}>
        <div className={styles.framescroll}>
          <u className={styles.framescroller}>
            {entries?.map((e) => (
              <li key={e.hash} className={styles.contentRow}>
                <a
                  href={
                    WORKER_URL +
                    selected.hash +
                    '/' +
                    e.name +
                    '?peer=' +
                    selected.peer
                  }
                  download
                  className={styles.rowLink}>
                  <div className={styles.peerHeading}>
                    <div>{e.name}</div>
                    <div>
                      {e.hash.slice(0, 8)}...{e.hash.slice(-8)}
                    </div>
                  </div>
                  <div className={styles.peerData}>{humanFileSize(e.size)}</div>
                </a>
              </li>
            ))}
          </u>
        </div>
      </Modal>
    </>
  );
}
