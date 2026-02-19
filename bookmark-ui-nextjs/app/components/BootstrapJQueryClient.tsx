'use client';
import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // 클라이언트에서만 import
    import('bootstrap').then(({ Modal }) => {
      const modalElement = document.getElementById('myModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    });
  }, []);

  return null;
}
