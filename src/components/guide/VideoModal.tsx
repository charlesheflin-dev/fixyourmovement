import { useEffect, useRef } from "react";

// Controlled port of the reference file's video modal. Relies on the
// .video-modal / .modal-shell / .modal-close / .modal-frame classes from
// guide.css and must be rendered inside the .fcs-guide wrapper by its parent.
// Open when `src` is a non-null string; closed when `src` is null.
interface VideoModalProps {
  src: string | null;
  fallback: string;
  onClose: () => void;
}

export default function VideoModal({ src, fallback, onClose }: VideoModalProps) {
  const isOpen = src !== null;
  const closeRef = useRef<HTMLButtonElement>(null);

  // While open: lock body scroll, move focus to Close, and listen for Escape.
  // Cleanup (on close or unmount) restores scroll and removes the listener.
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Closed: render nothing. This also clears the iframe (its source is removed
  // from the DOM), so playback stops and nothing autoplays before open.
  if (!isOpen) return null;

  return (
    <div
      className="video-modal open"
      aria-hidden="false"
      onClick={(e) => {
        // Backdrop click closes; clicks on inner content do not.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-shell">
        <button
          type="button"
          ref={closeRef}
          className="modal-close"
          aria-label="Close video"
          onClick={onClose}
        >
          Close &times;
        </button>
        <div className="modal-frame">
          <iframe
            src={src}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="FCS Companion video"
            onError={() => window.open(fallback, "_blank", "noopener")}
          />
        </div>
      </div>
    </div>
  );
}
