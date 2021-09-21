import {DialogOverlay, DialogContent} from '@reach/dialog';
import styles from './Modal.module.css';

type Props = {
  loading?: boolean;
  isOpen: boolean;
  actionTitle: string;
  onDismiss: () => void;
  dismissTitle?: string;
  children: React.ReactNode;
  center?: boolean;
  disableAction?: boolean;
  onlyDismiss?: boolean;
};

export default function Modal({
  actionTitle,
  loading,
  isOpen,
  center,
  onDismiss,
  children,
  dismissTitle,
  disableAction,
  onlyDismiss,
}: Props) {
  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={onDismiss}
      style={{
        zIndex: 2994,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
      }}>
      <DialogContent
        style={{
          width: 345,
          height: 300,
          borderRadius: 30,
          overflow: 'hidden',
          marginTop: '25vh',
          position: 'relative',
          padding: 10,
        }}
        aria-label={actionTitle}>
        <div className={styles.container}>{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
}
