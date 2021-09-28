import {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import NextImage from 'next/image';
import styles from '../pages/Home.module.css';
import Modal from './Modal';
import Spinner from './Spinner';
import logoDropper from '../public/LogoDropper.svg';
import humanFileSize from '../utils/humanFileSize';

export type Peer = {
  id: string;
  name: string;
  latency: number;
};

export type Content = {
  cid: string;
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

  const [file, setFile] = useState<File>(null);
  const [content, setContent] = useState<Content[]>([]);
  const onDrop = (files) => {
    setLoading(true);
    setFile(files[0]);
    submit(files[0])
      .then(setContent)
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        reset();
      });
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const reset = () => {
    setFile(null);
    setOpen(false);
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
      cid: rootCID,
      size: file.size,
      peer: addr.id,
    };
  };

  const submit = async (file: File): Promise<Content[]> => {
    return Promise.all(peers.slice(-1).map((addr) => put(file, addr)));
  };

  return (
    <>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        upload a file
      </button>
      <p className={styles.fineprint}>Uploaded files will be public</p>
      <Modal actionTitle="Upload" isOpen={open} onDismiss={reset}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        ) : file ? (
          <div className={styles.successContainer}>
            <div className={styles.successContent}>
              <span className={styles.taglight}>✅ File uploaded</span>
              <h2>
                <strong>{file.name}</strong>
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
