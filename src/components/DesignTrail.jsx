import React, { useRef, useEffect } from "react";

const DesignTrail = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        resizeCanvas();

        const pointer = { x: width / 2, y: height / 2 };

        const createTrail = (count, color, delayFactor) => ({
            color,
            points: Array.from({ length: count }, () => ({ x: pointer.x, y: pointer.y })),
            delayFactor
        });

        const trails = [
            createTrail(40, "#00ffff", 0.2),  // Cyan
            createTrail(40, "#ff00ff", 0.1),  // Magenta
            createTrail(40, "#ffff00", 0.05), // Yellow
        ];

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            for (const trail of trails) {
                const { points, color, delayFactor } = trail;

                // Update points for this trail
                for (let i = points.length - 1; i > 0; i--) {
                    points[i].x += (points[i - 1].x - points[i].x) * 0.6;
                    points[i].y += (points[i - 1].y - points[i].y) * 0.6;
                }

                points[0].x += (pointer.x - points[0].x) * delayFactor;
                points[0].y += (pointer.y - points[0].y) * delayFactor;

                // Draw trail
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            requestAnimationFrame(render);
        };

        const handleMouseMove = (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", resizeCanvas);

        render();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);


    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
                pointerEvents: "none",
            }}
        />
    );
};

export default DesignTrail;
