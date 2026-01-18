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
    const prevWidth = canvas.width;
    const prevHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorSet;
    ctx.lineWidth = brushSize;

    // 4. Draw the image back
    const img = new Image();
    img.src = tempImage;
    img.onload = () => {
      // This keeps the drawing in the top-left corner
      ctx.drawImage(img, 0, 0);
    };
  };

  // Set initial size
  handleResize();

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
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

  const ctx = ctxRef.current;
  const currentMove = UndoStackRef.current.pop();
  RedoStackRef.current.push(currentMove);

  const prevState = UndoStackRef.current[UndoStackRef.current.length - 1];

  const img = new Image();
  img.src = prevState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(img, 0, 0);
  };

  setUndoFn(false);
}, [UndoFn, setUndoFn]);

useEffect(() => {
  if (!RedoFn || RedoStackRef.current.length === 0) {
    setRedoFn(false);
    return;
  }

  const ctx = ctxRef.current;
  const nextState = RedoStackRef.current.pop();
  
  UndoStackRef.current.push(nextState);

  const img = new Image();
  img.src = nextState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(img, 0, 0);
  };

  setRedoFn(false);
}, [RedoFn, setRedoFn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;
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

  const drawingstart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    iswritingRef.current = true;

    if (activeTool === 2) {
      // SHAPE TOOL
      startPosRef.current = { x, y };
      snapshotRef.current = ctxRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      return;
    }

    // PEN / ERASER
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  /* ---------------- DRAWING ---------------- */
  const drawing = (e) => {
    if (!iswritingRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 2) {
      // SHAPE PREVIEW
      const { x: sx, y: sy } = startPosRef.current;

      ctxRef.current.putImageData(snapshotRef.current, 0, 0);

      switch (shapeSet) {
        case "rect":
          ctxRef.current.strokeRect(sx, sy, x - sx, y - sy);
          break;

        case "circle":
          ctxRef.current.beginPath();
          ctxRef.current.arc(
            sx,
            sy,
            Math.hypot(x - sx, y - sy),
            0,
            Math.PI * 2
          );
          ctxRef.current.stroke();
          break;

        case "line":
          ctxRef.current.beginPath();
          ctxRef.current.moveTo(sx, sy);
          ctxRef.current.lineTo(x, y);
          ctxRef.current.stroke();
          break;

        default:
          break;
      }
      return;
    }

    // PEN / ERASER
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  /* ---------------- STOP DRAWING ---------------- */
  const stopDrawing = () => {
  if (!iswritingRef.current) return;
  iswritingRef.current = false;
  ctxRef.current.closePath();

  // Save state to Undo Stack
  UndoStackRef.current.push(canvasRef.current.toDataURL());
  
  // 🔥 CRITICAL: Clear Redo stack when a new action is performed
  RedoStackRef.current = []; 
};

  useEffect(() => {
    window.addEventListener("mouseup", stopDrawing);
    return () => window.removeEventListener("mouseup", stopDrawing);
  }, []);

  return (
    <canvas
  ref={canvasRef}
  onMouseDown={drawingstart}
  onMouseMove={drawing}
  className="w-full h-full"
  style={{
    backgroundColor: "#17151c",
    backgroundImage: `
      radial-gradient(
        rgba(255,255,255,0.12) 1px,
        transparent 1px
      )
    `,
    backgroundSize: "24px 24px",
  }}
/>


  );
};

export default Canvas;
