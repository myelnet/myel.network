import {useState, useEffect} from 'react';
import styles from '../pages/Home.module.css';
import {Peer} from './Uploader';

type PeerRowProps = Peer & {
  selected?: boolean;
  onSelect?: (id: string) => void;
};

export default function PeerRow({
  id,
  name,
  location,
  latency,
  selected,
  onSelect,
}: PeerRowProps) {
  return (
    <li className={styles.peerRow}>
      <div className={styles.peerHeading}>
        <div>Peer {id.slice(-16)}</div>
        <div>
          {location} <span className={styles.fineprint}>({latency ?? 0}s)</span>
        </div>
      </div>
      <div className={styles.emptyCheck} onClick={() => onSelect(id)}>
        {selected && <span className={styles.fillCheck}>✅</span>}
      </div>
    </li>
  );
}
