import React, { useContext, useEffect, useRef } from "react";
import { data } from "../../contextapi/Context";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const {
    iswritingRef,
    brushSize,
    colorSet,
    activeTool,
    shapeSet,
    startPosRef,
    snapshotRef,
    UndoStackRef,
    RedoStackRef,
    UndoFn,
    setUndoFn,
    RedoFn,
    setRedoFn
  } = useContext(data);

 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctxRef.current = ctx;

    const handleResize = () => {
      const tempImage = canvas.toDataURL();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const img = new Image();
      img.src = tempImage;
      img.onload = () => ctx.drawImage(img, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ctxRef.current) return;
    if (activeTool === 1) {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineWidth = brushSize * 2;
    } else { 
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.strokeStyle = colorSet;
      ctxRef.current.lineWidth = brushSize;
    }
  }, [activeTool, brushSize, colorSet]);

  
  useEffect(() => {
    if (UndoStackRef.current.length === 0) {
      UndoStackRef.current.push(canvasRef.current.toDataURL());
    }
  }, []);

  useEffect(() => {
    if (!UndoFn || UndoStackRef.current.length <= 1) {
      setUndoFn(false);
      return;
    }
    const currentMove = UndoStackRef.current.pop();
    RedoStackRef.current.push(currentMove);
    const prevState = UndoStackRef.current[UndoStackRef.current.length - 1];
    const img = new Image();
    img.src = prevState;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctxRef.current.drawImage(img, 0, 0);
    };
    setUndoFn(false);
  }, [UndoFn, setUndoFn]);

  useEffect(() => {
    if (!RedoFn || RedoStackRef.current.length === 0) {
      setRedoFn(false);
      return;
    }
    const nextState = RedoStackRef.current.pop();
    UndoStackRef.current.push(nextState);
    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctxRef.current.drawImage(img, 0, 0);
    };
    setRedoFn(false);
  }, [RedoFn, setRedoFn]);

 
  const getCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

 

  const drawingstart = (e) => {
    if (e.type === 'touchstart') e.preventDefault(); // Prevents scrolling on touch
    const { x, y } = getCoordinates(e);
    iswritingRef.current = true;

    if (activeTool === 2) {
      startPosRef.current = { x, y };
      snapshotRef.current = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const drawing = (e) => {
    if (!iswritingRef.current) return;
    if (e.type === 'touchmove') e.preventDefault(); 
    const { x, y } = getCoordinates(e);

    if (activeTool === 2) {
      const { x: sx, y: sy } = startPosRef.current;
      ctxRef.current.putImageData(snapshotRef.current, 0, 0);

      switch (shapeSet) {
        case "rect": ctxRef.current.strokeRect(sx, sy, x - sx, y - sy); break;
        case "circle":
          ctxRef.current.beginPath();
          ctxRef.current.arc(sx, sy, Math.hypot(x - sx, y - sy), 0, Math.PI * 2);
          ctxRef.current.stroke();
          break;
        case "line":
          ctxRef.current.beginPath();
          ctxRef.current.moveTo(sx, sy);
          ctxRef.current.lineTo(x, y);
          ctxRef.current.stroke();
          break;
        default: break;
      }
      return;
    }
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!iswritingRef.current) return;
    iswritingRef.current = false;
    ctxRef.current.closePath();
    UndoStackRef.current.push(canvasRef.current.toDataURL());
    RedoStackRef.current = [];
  };

  
  useEffect(() => {
    window.addEventListener("mouseup", stopDrawing);
    window.addEventListener("touchend", stopDrawing);
    return () => {
      window.removeEventListener("mouseup", stopDrawing);
      window.removeEventListener("touchend", stopDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={drawingstart}
      onMouseMove={drawing}
      onTouchStart={drawingstart}
      onTouchMove={drawing}
      className="w-full h-full touch-none" 
      style={{
        backgroundColor: "#17151c",
        backgroundImage: `radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
};

export default Canvas;