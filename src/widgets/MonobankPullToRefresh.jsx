import React, { useState, useRef, useEffect } from "react";
import imageIcon from "../assets/abank.jpg";
const DraggableDownWrapper = ({
  children,
  className = "",
  style = {},
  setHasFlown,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [flyRect, setFlyRect] = useState(null); // { top, left, width, height }
  const startY = useRef(null);
  const isDragging = useRef(false);
  const blockRef = useRef(null);
  const containerRef = useRef(null);

  const MAX_PULL = 50;
  const FLY_DURATION = 700; // ms

  // touch handlers (mobile)
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
    setIsFlying(false);
    setFlyRect(null);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.current;
    if (delta > 0) {
      setOffsetY(Math.min(delta, MAX_PULL));
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // если есть смещение — запускаем взлёт (давай взлетать всегда, если дотянули хоть чуть)
    if (offsetY > 0) {
      // получаем экранную позицию абсолютного блока
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect();
        setFlyRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        // включаем режим "клона летит"
        setIsFlying(true);
      } else {
        // на всякий случай — просто выключаем смещение
        setIsFlying(false);
      }
    }

    setOffsetY(0); // основной контент возвращается
  };

  // mouse support (desktop) — опционально, но полезно
  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    isDragging.current = true;
    setIsFlying(false);
    setFlyRect(null);
    // prevent text selection while dragging
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.clientY;
    const delta = currentY - startY.current;
    if (delta > 0) setOffsetY(Math.min(delta, MAX_PULL));
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (offsetY > 0) {
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect();
        setFlyRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
        setIsFlying(true);
      }
    }

    setOffsetY(0);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (!isFlying) return;

    setHasFlown(false);

    const t = setTimeout(() => {
      setIsFlying(false);
      setFlyRect(null);

      setHasFlown(true);

      // ⏳ Через 2 секунды снова сбрасываем
      const resetT = setTimeout(() => {
        setHasFlown(false);
      }, 2000);

      // Чистим этот таймер тоже
      return () => clearTimeout(resetT);
    }, FLY_DURATION);

    return () => clearTimeout(t);
  }, [isFlying]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "visible",
        touchAction: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Абсолютный блок — вылезает из-под компонента при таче */}
      {/* Во время взлёта мы скрываем этот блок (чтобы не было двух видимых копий) */}
      {(offsetY > 0 || (!isFlying && flyRect)) && (
        <div
          ref={blockRef}
          style={{
            position: "absolute",
            bottom: `${offsetY + 210}px`, // 👈 теперь блок “сидит” под компонентом
            left: 0,
            right: 0,
            height: MAX_PULL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
            // вместо translateY — используем bottom, чтобы именно "вылазил"
            transition: isDragging.current ? "none" : "bottom 0.25s ease",
            opacity: isFlying ? 0 : 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={imageIcon}
            alt="Pull to refresh"
            style={{
              width: 30,
              height: 30,
              // 👈 плавное увеличение при вытягивании
              transition: "transform 0.15s ease",
            }}
          />
        </div>
      )}
      {/* Хак для плавного запуска анимации: рендер fixed-клона, потом через microtask менять стиль */}
      {isFlying && flyRect && (
        <FlyingAnimator flyRect={flyRect} duration={FLY_DURATION} />
      )}

      {/* Основной компонент (сдвигается при таче) */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          transform: `translateY(${offsetY}px)`,
          transition: isDragging.current ? "none" : "transform 0.25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * FlyingAnimator — компонент, который рендерит fixed-клон и запускает анимацию
 * отдельно, чтобы transition корректно сработал (от 0 -> -100vh).
 */
const FlyingAnimator = ({ flyRect, duration }) => {
  const elRef = useRef(null);
  useEffect(() => {
    // через RAF ставим transform чтобы transition сработал
    const el = elRef.current;
    if (!el) return;
    // первоначально мы рендерим transform(0) (в inline-стиле ниже).
    // в следующем тикe заставим его лететь.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = "translateY(-100vh)";
      });
    });
    // очистка — опционально
    return () => {};
  }, [flyRect]);

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        left: flyRect.left,
        top: flyRect.top,
        width: flyRect.width,
        height: flyRect.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transform: "translateY(0)",
        transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        pointerEvents: "none",
      }}
    >
      <img
        src={imageIcon}
        alt="Pull to refresh"
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};

export default DraggableDownWrapper;
