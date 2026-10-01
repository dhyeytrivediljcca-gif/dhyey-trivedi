import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface CursorContextState {
  text: string;
  variant: 'default' | 'hover' | 'project' | 'play' | 'external' | 'audio' | 'hidden';
}

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorContextState>({
    text: '',
    variant: 'default',
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Custom cursor event listener
    const handleCursorChange = (e: CustomEvent<CursorContextState>) => {
      setCursorState(e.detail);
    };

    window.addEventListener('custom-cursor-change' as unknown as keyof WindowEventMap, handleCursorChange as EventListener);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('custom-cursor-change' as unknown as keyof WindowEventMap, handleCursorChange as EventListener);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isProject = cursorState.variant === 'project';
  const isPlay = cursorState.variant === 'play';
  const isExternal = cursorState.variant === 'external';
  const isAudio = cursorState.variant === 'audio';
  const isHovered = cursorState.variant === 'hover' || isProject || isPlay || isExternal || isAudio;

  return (
    <>
      {/* Primary Minimal Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-emerald-400"
        style={{
          width: isHovered ? 0 : 7,
          height: isHovered ? 0 : 7,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: cursorState.variant === 'hidden' ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1200,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* Trailing Interactive Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full transition-colors duration-200 ${
          isHovered
            ? 'bg-emerald-400 text-black font-mono font-bold text-[10px] tracking-wider shadow-lg shadow-emerald-500/30'
            : 'border border-emerald-400/40 bg-emerald-400/5'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isProject || isPlay || isExternal || isAudio ? 70 : isHovered ? 40 : 28,
          height: isProject || isPlay || isExternal || isAudio ? 70 : isHovered ? 40 : 28,
          scale: cursorState.variant === 'hidden' ? 0 : 1,
          opacity: cursorState.variant === 'hidden' ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.4,
        }}
      >
        {cursorState.text ? (
          <span className="select-none uppercase text-center px-1 leading-none font-semibold">
            {cursorState.text}
          </span>
        ) : null}
      </motion.div>
    </>
  );
};

export const setCustomCursor = (text: string, variant: CursorContextState['variant'] = 'hover') => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('custom-cursor-change', {
      detail: { text, variant },
    });
    window.dispatchEvent(event);
  }
};

export const resetCustomCursor = () => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('custom-cursor-change', {
      detail: { text: '', variant: 'default' },
    });
    window.dispatchEvent(event);
  }
};
