import React, { useState, useRef, useEffect } from "react";
import imageIcon from "../assets/rocket.png";

const DraggableDownWrapper = ({
  children,
  className = "",
  style = {},
  setHasFlown,
  isOpen,
  offsetY,
  setOffsetY,
}) => {
  const [isFlying, setIsFlying] = useState(false);
  const [flyRect, setFlyRect] = useState(null);
  const startY = useRef(null);
  const isDragging = useRef(false);
  const blockRef = useRef(null);
  const containerRef = useRef(null);

  const MAX_PULL = 50;
  const FLY_DURATION = 700; // ms

  // --- MOUSE handlers (unchanged) ---
  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    isDragging.current = true;
    setIsFlying(false);
    setFlyRect(null);
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
    if (offsetY > 0 && blockRef.current) {
      const rect = blockRef.current.getBoundingClientRect();
      setFlyRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setIsFlying(true);
    }
    setOffsetY(0);
    document.body.style.userSelect = "";
  };

  // --- Touch: use native listeners so we can preventDefault selectively ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      // начальная координата (не начинаем drag сразу — только запомним старт)
      startY.current = e.touches[0].clientY;
      // don't set isDragging yet — решим в move, чтобы не блокировать scroll
      isDragging.current = false;
      setIsFlying(false);
      setFlyRect(null);
    };

    let lastDelta = 0;

    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = currentY - (startY.current ?? currentY);
      lastDelta = delta;

      // Если тянем вниз (delta > 0) и страница вверху — перехватываем (preventDefault) и начинаем drag
      if (delta > 0 && window.scrollY === 0) {
        // отменяем нативный скролл только в этом конкретном случае
        e.preventDefault();
        // включаем режим drag (если ещё не включён)
        if (!isDragging.current) {
          isDragging.current = true;
        }
        setOffsetY(Math.min(delta, MAX_PULL));
      } else {
        // иначе — не мешаем нативному скроллу
        // если раньше мы были в dragging, но теперь дельта изменилась в сторону - пусть сбросится
        // (ничего делать)
      }
    };

    const onTouchEnd = () => {
      // если мы были в dragging — завершаем с логикой взлёта
      if (isDragging.current) {
        isDragging.current = false;
        if (lastDelta > 0) {
          const finalOffset = Math.min(lastDelta, MAX_PULL);
          if (finalOffset > 0 && blockRef.current) {
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
      }
      lastDelta = 0;
    };

    // Passive false — чтобы можно было preventDefault()
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [setOffsetY]);

  // скрываем клона после анимации
  useEffect(() => {
    if (!isFlying) return;

    setHasFlown(false);
    localStorage.setItem("finishedFlying", "false");

    const t = setTimeout(() => {
      setIsFlying(false);
      setFlyRect(null);

      setHasFlown(true);
      localStorage.setItem("finishedFlying", "true");

      const resetT = setTimeout(() => {
        setHasFlown(false);
        localStorage.setItem("finishedFlying", "false");
      }, 2000);

      // clear inner timeout when unmount/cleanup
      return () => clearTimeout(resetT);
    }, FLY_DURATION);

    return () => clearTimeout(t);
  }, [isFlying, setHasFlown]);

  if (isOpen) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "visible",
        // НЕ ставим touchAction: "none" — чтобы не блокировать нативный скролл
        touchAction: "auto",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Абсолютный блок — вылезает из-под компонента при таче */}
      {(offsetY > 0 || (!isFlying && flyRect)) && (
        <div
          ref={blockRef}
          style={{
            position: "absolute",
            bottom: `${offsetY < 38 ? offsetY + 200 : 240}px`,
            left: 0,
            right: 0,
            height: MAX_PULL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
            transition: isDragging.current ? "none" : "bottom 0.25s ease",
            opacity: isFlying ? 0 : 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={imageIcon}
            alt="Pull to refresh"
            style={{
              width: 50,
              height: 70,
              transition: "transform 0.15s ease",
            }}
          />
        </div>
      )}

      {isFlying && flyRect && (
        <FlyingAnimator flyRect={flyRect} duration={FLY_DURATION} />
      )}

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
