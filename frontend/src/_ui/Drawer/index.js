import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import cx from 'classnames';
import useMountTransition from '@/_hooks/useMountTransition';
import { useEventListener } from '@/_hooks/use-event-listener';
import '@/_styles/drawer.scss';

function createPortalRoot() {
  const drawerRoot = document.createElement('div');
  drawerRoot.setAttribute('id', 'drawer-root');

  return drawerRoot;
}

const Drawer = ({ isOpen, children, className, onClose, position = 'left', removeWhenClosed = true }) => {
  const bodyRef = useRef(document.querySelector('body'));
  const portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = '';
    };
  }, []);

  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = 'hidden';
      } else {
        bodyRef.current.style.overflow = '';
      }
    };

    updatePageScroll();
  }, [isOpen]);

  const onKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEventListener('keyup', onKeyPress);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <FocusTrap active={isOpen}>
      <div
        aria-hidden={`${!isOpen}`}
        className={cx('drawer-container', {
          open: isOpen,
          in: isTransitioning,
          className,
        })}
      >
        <div className={cx('drawer', position)} role="dialog">
          {children}
        </div>
        <div className="backdrop" onClick={onClose} />
      </div>
    </FocusTrap>,
    portalRootRef.current
  );
};

export default Drawer;
