import {useState} from 'react';
import {Content, Peer} from './Uploader';
import styles from '../pages/Home.module.css';
import humanFileSize from '../utils/humanFileSize';
import Spinner from './Spinner';

type RetrieverProps = {
  peers: Peer[];
  content: Content[];
};

export default function Retriever({peers, content}) {
  const [loading, setLoading] = useState(false);
  const peermap = peers.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});
  const clist = content.filter((c) => !!peermap[c.peer]);
  const retrieve = async (content: Content) => {
    try {
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.framescroll}>
        {clist.length ? (
          <u className={styles.framescroller}>
            {clist.map((c) => (
              <li
                key={c.cid + c.peer}
                className={styles.contentRow}
                onClick={() => retrieve(c)}>
                <div className={styles.peerHeading}>
                  <div>
                    {c.cid.slice(0, 8)}...{c.cid.slice(-8)}
                  </div>
                  <div>{humanFileSize(c.size)}</div>
                </div>
                <div className={styles.peerData}>
                  {c.peer.slice(0, 4)}...{c.peer.slice(-8)}
                </div>
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
          {loading ? 'Downloading...' : 'Your file will download automaticaly.'}
        </p>
      </div>
    </>
  );
}
