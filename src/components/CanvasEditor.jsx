import React, { useRef, useState, useEffect } from 'react';

const CanvasEditor = ({ image, zones, setZones}) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [start, setStart] = useState(null);
    const [currentRect, setCurrentRect] = useState(null);

    useEffect(() => {
        if (!image) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            imgRef.current = img;
            drawCanvas();
        };
    }, [image, zones]);

    useEffect(() => {
        drawCanvas();
    }, [currentRect]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!imgRef.current) return;

        // Resize canvas to image
        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;

        // Clear + draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgRef.current, 0, 0);

        // Draw existing zones
        zones.forEach((zone, idx) => {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'red';
            ctx.fillText(`${idx + 1}`, zone.x + 4, zone.y + 16);
        });

        // Draw current rectangle while dragging
        if (currentRect) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 2]);
            ctx.strokeRect(currentRect.x, currentRect.y, currentRect.width, currentRect.height);
            ctx.setLineDash([]);
        }
    };

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setStart({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || !start) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const width = x - start.x;
        const height = y - start.y;

        setCurrentRect({
            x: start.x,
            y: start.y,
            width,
            height,
        });
    };

    const handleMouseUp = () => {
        if (currentRect) {
            const normalized = {
                x: Math.min(currentRect.x, currentRect.x + currentRect.width),
                y: Math.min(currentRect.y, currentRect.y + currentRect.height),
                width: Math.abs(currentRect.width),
                height: Math.abs(currentRect.height),
            };
            setZones((prev) => [...prev, normalized]);
        }
        setIsDrawing(false);
        setStart(null);
        setCurrentRect(null);
    };

    return (
        <div>
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ border: '1px solid #ccc', cursor: 'crosshair', display: 'block', maxWidth: '100%' }}
        />
        </div>
    );
};

    

export default CanvasEditor;
