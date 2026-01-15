import React, { useContext, useEffect, useRef } from 'react'
import { data } from '../../contextapi/Context';
const Canvas = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const {iswritingRef,mousexRef,mouseyRef,brushSize,colorSet}=useContext(data);

    useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#17151c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctxRef.current = ctx;
  }, []);

  const drawingstart = (e) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  iswritingRef.current = true;
  ctxRef.current.strokeStyle = colorSet;
  ctxRef.current.lineWidth = brushSize;
  ctxRef.current.beginPath();
  ctxRef.current.moveTo(x, y);
};

const drawing = (e) => {
  if (!iswritingRef.current) return;

  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctxRef.current.lineTo(x, y);
  ctxRef.current.stroke();
};
const stopDrawing = () => {
  iswritingRef.current = false;
  ctxRef.current.closePath();
};

  return (
    <canvas ref={canvasRef}  onMouseDown={drawingstart} onMouseMove={drawing} onMouseUp={stopDrawing} className='w-full h-full'>
    </canvas>
    
  )
}

export default Canvas