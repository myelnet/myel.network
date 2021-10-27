import {useState, useEffect, useMemo} from 'react';
import {Peer} from '../components/Uploader';

type UsePeersParams = {
  ping: boolean;
};

type UsePeersResult = {
  peers: Peer[];
  selectedPeers: Peer[];
  selectPeer: (id: string) => void;
  selected: {[key: string]: boolean};
};

export function peerAddr(p: Peer): string {
  return '/dns4/' + p.name + '/tcp/443/wss/p2p/' + p.id;
}

const defaultPeers = [
  {
    id: '12D3KooWStJfAywQmfaVFQDQYr9riDnEFG3VJ3qDGcTidvc4nQtc',
    name: 'ohio.myel.zone',
    location: 'Ohio, US',
  },
  {
    id: '12D3KooWPQTuoHCKQJKNsfJqMbiGn7Ms1RLmqSqVmSVipcmYptrf',
    name: 'simparis.myel.zone',
    location: 'Paris, FR',
  },
  {
    id: '12D3KooWJBZ6peowSj8GExHKqZKEBdNtBbz8AFp6YSnBCpLfJVoo',
    name: 'antibes.myel.zone',
    location: 'Antibes, FR',
  },
  {
    id: '12D3KooWLLPFQHmEiF8Qc9XN54P3o7XBkxyL4ucq2p3ruG92J4zr',
    name: 'colenyc.ngrok.io',
    location: 'Brooklyn, US',
  },
  {
    id: '12D3KooWRP3W5Tj5ZbJrN7dkNcmFFjm5sJNeWE1aHZnwkR6HJXCt',
    name: 'karinmia.ngrok.io',
    location: 'Miami, US',
  },
  {
    id: '12D3KooWNzT13Ngk6EZjMZ9eHZxd3mG8Gcbfwbb9bGUS6ugBFo6q',
    name: 'stefanbos.ngrok.io',
    location: 'Boston, US',
  },
  {
    id: '12D3KooWMZf1rQLwmQ1Wp28xHNuLwc6Zh6tG87bq8uU35wELKbUb',
    name: 'willsf.ngrok.io',
    location: 'San Francisco, US',
  },
  {
    id: '12D3KooWLaJQ7L6Q3VWxNNxqE8Tcj2wAq1QAvdBieSteAxg9KTCr',
    name: 'frankfurt.myel.zone',
    location: 'Frankfurt, DE',
  },
  {
    id: '12D3KooWQrFmYVFZPctyJ8kobjJg5AGgZHXB8CiuKCiWeseLcdbm',
    name: 'london.myel.zone',
    location: 'London, UK',
  },
];

export default function usePeers(
  {ping}: UsePeersParams = {ping: true}
): UsePeersResult {
  const [peers, setPeers] = useState<Peer[]>(defaultPeers);
  const [selected, setSelected] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (ping) {
      Promise.all(
        peers.map(async (p) => {
          const start = new Date().getTime();
          const calcTime = () => {
            const end = new Date().getTime();
            return {
              ...p,
              latency: (end - start) / 1000,
            };
          };
          // fail a handshake to test latency
          try {
            await fetch('https://' + p.name, {
              headers: {
                Accept: 'text/html',
              },
            });
            return calcTime();
          } catch (e) {
            return calcTime();
          }
        })
      ).then((pwl) => {
        // sort by smallest latency
        const sorted = pwl.sort((pa, pb) => pa.latency - pb.latency);
        // select the first 4 by default
        const first4 = sorted
          .slice(0, 4)
          .reduce((sel, p) => ({...sel, [p.id]: true}), {});
        setPeers(sorted);
        setSelected(first4);
      });
    }
  }, []);

  const selectPeer = (id: string) => {
    setSelected({...selected, [id]: !selected[id]});
  };

  const selectedPeers = useMemo(() => peers.filter((p) => selected[p.id]), [
    peers,
    selected,
  ]);

  return {peers, selectPeer, selected, selectedPeers};
}
