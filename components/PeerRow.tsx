import {useState, useEffect} from 'react';
import styles from '../pages/Home.module.css';
import {Peer} from './Uploader';

type PeerRowProps = Peer;

export default function PeerRow({id, name, location, latency}: PeerRowProps) {
  return (
    <li className={styles.peerRow}>
      <div className={styles.peerHeading}>
        <div>{id.slice(-6)}</div>
        <div>{location}</div>
      </div>
      <div className={styles.peerData}>{latency}s</div>
    </li>
  );
}
