import {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import NextImage from 'next/image';
import styles from '../pages/Home.module.css';
import Modal from './Modal';
import Spinner from './Spinner';
import logoDropper from '../public/LogoDropper.svg';
import humanFileSize from '../utils/humanFileSize';
import {peerAddr} from '../utils/usePeers';

export type Peer = {
  id: string;
  name: string;
  latency?: number;
  location?: string;
};

export type Content = {
  hash: string;
  size: number;
  peer: string;
};

type UploaderProps = {
  peers: Peer[];
  onComplete: (items: Content[]) => void;
};

export default function Uploader({peers, onComplete}: UploaderProps) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [file, setFile] = useState<File>(null);
  const [content, setContent] = useState<Content[]>([]);
  const onDrop = (files) => {
    setLoading(true);
    setFile(files[0]);
    submit(files[0])
      .then((items) => {
        const results = items
          .map((result) =>
            result.status === 'fulfilled' ? result.value : null
          )
          .filter(Boolean);
        setContent(results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const reset = () => {
    setFile(null);
    setOpen(false);
    setError(false);
    if (content.length) {
      onComplete(content);
      setContent([]);
    }
  };

  const put = async (file: File, addr: Peer): Promise<Content> => {
    const body = new FormData();
    body.append('file', file, file.name);

    const response = await fetch('https://' + addr.name, {
      method: 'POST',
      body,
    });
    const rootCID = response.headers.get('Ipfs-Hash');
    if (!rootCID) {
      throw new Error('provider did not return CID');
    }
    return {
      hash: rootCID,
      size: file.size,
      peer: peerAddr(addr),
    };
  };

  // replicate with 4 peers only. We don't want this demo to stress the network too much yet.
  // TODO: make this adjustable
  const submit = (file: File): Promise<PromiseSettledResult<Content>[]> => {
    const promises = peers.slice(0, 4).map((addr) => put(file, addr));
    return Promise.allSettled(promises);
  };

  return (
    <>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        upload a file
      </button>
      <p className={styles.fineprint}>Uploaded files will be public</p>
      <Modal actionTitle="Upload" isOpen={open} onDismiss={reset}>
        {loading || error ? (
          <div className={styles.loadingContainer}>
            {loading ? (
              <Spinner />
            ) : (
              <div className={styles.fineprint}>Something went wrong</div>
            )}
          </div>
        ) : file ? (
          <div className={styles.successContainer}>
            <div className={styles.successContent}>
              <span className={styles.taglight}>✅ File uploaded</span>
              <h2>
                <strong>
                  {file.name.slice(0, 8)}...{file.name.split('.').pop()}
                </strong>
              </h2>
              <h2>{humanFileSize(file.size)}</h2>
              <div className={styles.fineprint}>
                Your file was recieved by {content.length} peers. It is now
                cached on the Myel network and can be retrieved from anywhere.
              </div>
            </div>
            <button className={styles.blackBtn} onClick={reset}>
              dismiss
            </button>
          </div>
        ) : (
          <div className={styles.dropContainer} {...getRootProps()}>
            <input {...getInputProps()} />
            <span className={styles.taglight}>Upload a file</span>
            <NextImage src={logoDropper} alt="Drag on the logo" />
            <p className={styles.fineprint}>
              Drag and drop to upload a file of any size or type
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
