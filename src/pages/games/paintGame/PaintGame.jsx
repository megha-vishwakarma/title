import React, { useEffect, useState } from "react";
import "./PaintGame.css";

const PaintGame = () => {
    const [currentColor, setCurrentColor] = useState("#0075ff");
    const [currentSize, setCurrentSize] = useState(5);

    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        const container = document.querySelector(".contain");
        const group = document.querySelector("#group");
        const colorInput = document.querySelector("#color-input");
        const sizeInput = document.querySelector("#size-input");

        let svgWidth, svgHeight, initialX, initialY;
        let circles = [];
        let deviceType = isTouchDevice() ? "touch" : "mouse";

        const events = {
            mouse: {
                click: "click",
            },
            touch: {
                click: "touchstart",
            },
        };

        const handleColorChange = () => {
            setCurrentColor(colorInput.value);
        };

        const handleSizeChange = () => {
            setCurrentSize(sizeInput.value);
        };

        const handleContainerClick = (e) => {
            let mouseX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
            let mouseY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
        
            // Adjust coordinates based on the container's position and size
            const rect = container.getBoundingClientRect();
            let relativeX = (mouseX - rect.left) / rect.width;
            let relativeY = (mouseY - rect.top) / rect.height;
        
            let finalX = (relativeX * 100).toFixed(2);
            let finalY = (relativeY * 100).toFixed(2);
        
            // Ensure finalX and finalY are valid numbers
            if (!isNaN(finalX) && !isNaN(finalY)) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", finalX + "%");
                circle.setAttribute("cy", finalY + "%");
                circle.setAttribute("r", currentSize / 2);
                circle.style.fill = currentColor; // Use style attribute for dynamic color
        
                group.appendChild(circle);
            }
        };
        

        window.onload = () => {
            colorInput.value = currentColor;
            sizeInput.value = currentSize;
            [svgHeight, svgWidth] = [500, 500];
            initialX = svgWidth;
            initialY = svgHeight;
            circles = [];
        };

        colorInput.addEventListener("input", handleColorChange);
        sizeInput.addEventListener("input", handleSizeChange);
        container.addEventListener(
            events[deviceType].click,
            handleContainerClick
        );

        // Cleanup event listeners on component unmount
        return () => {
            colorInput.removeEventListener("input", handleColorChange);
            sizeInput.removeEventListener("input", handleSizeChange);
            container.removeEventListener(
                events[deviceType].click,
                handleContainerClick
            );
        };
    }, [currentColor, currentSize]);

    return (
        <div className="contain ">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <defs>
                    <style>
                        {`
                            .cls-2 {
                                fill: #fff;
                                stroke: #000;
                                stroke-miterlimit: 10;
                                stroke-width: 3.68px;
                            }
                            .cls-3 {
                                fill: #050506;
                            }
                            .cls-4 {
                                fill: #09090b;
                            }
                            .cls-5 {
                                fill: #111012;
                            }
                        `}
                    </style>
                </defs>
                <g id="group"></g>
                <path
                    className="cls-2"
                    d="M456.26,472.69a66.58,66.58,0,0,0-4.88-8.67c-5.13-7.93-10.4-15.76-15.11-24a87.09,87.09,0,0,1-10.35-30.12c-1.47-9.31-1.23-18.65-1-28,.38-14.55,1.89-29,2.67-43.56A117.73,117.73,0,0,0,425,304.29c-7.36-30.56-22.76-56-48.83-74.23-11.55-8.1-23.89-14.63-37.64-18.08-15.93-4-32-2.74-48-.35-9.2,1.38-17.83,4.62-26.4,8.08-9.32,3.77-18.56,7.76-28.22,10.62-8.07,2.39-16.26,4.32-24.77,4.09-13.57-.36-23.12-7.1-29.16-19a22.55,22.55,0,0,1-1.86-14,75.8,75.8,0,0,1,11.38-29.05c2.89-4.55,6.06-8.93,9.14-13.36A158.36,158.36,0,0,0,221.84,117c5.25-16.34,7.14-32.83,2.8-49.68-3.22-12.51-9-23.41-19.69-31.2-1.68-1.22-3.26-2.58-4.91-3.84C190.09,24.6,178.66,21,166.32,19.94a128.73,128.73,0,0,0-34.44,1.79c-11.15,2.08-22,5-32,10.74C81.44,43.08,66.17,57.39,53.19,74.08c-8.1,10.43-12,22.42-9.94,35.91,2.33,15.39,9.36,28.13,21.77,37.52C76.17,155.94,89.09,160,103,160.7c9.63.49,19.3.53,28.78-2.34a5.73,5.73,0,0,1-1.52,2.89,322.53,322.53,0,0,0-20.41,33.84c-13.66,26.23-23.45,53.75-27.45,83.18-2.65,19.52-2.52,39,1.54,58.29,3.91,18.63,11.22,35.8,23,50.87a22.94,22.94,0,0,1,4.42,9.74c2.54,12.06,3.08,24.3,3.67,36.55a74.42,74.42,0,0,0,2.93,19c2.21,7,6.9,11.35,13.55,14a38.92,38.92,0,0,0,30.59-.33,2.37,2.37,0,0,1,3,.4,34.54,34.54,0,0,0,16,7.88,145.58,145.58,0,0,0,15.43,2c9.36.74,16.85-2.56,22.34-10.25a67,67,0,0,0,3.88-6.38,88.85,88.85,0,0,0,8.46-22.33c.3-1.26,.47-2.39,2.41-2.55a224.65,224.65,0,0,0,38.6-6.62,2.34,2.34,0,0,1,2.21.05c.26,3.52,.6,7.14,.77,10.76a123.78,123.78,0,0,0,3.1,21.24,11.24,11.24,0,0,0,7.11,8.39,25.18,25.18,0,0,0,12.81,1.77,30.42,30.42,0,0,1,8.92,1.3c8.79,3.11,17.76,5,27.17,4a17.71,17.71,0,0,0,4.82-1.12,43.47,43.47,0,0,0,15.3-10.45c6.77-7,10.78-15.43,13.06-24.76a240.06,240.06,0,0,0,6.34-45.59,3.13,3.13,0,0,0,.22-1.51c0,.49-.14,1.05.36,1.44a206.63,206.63,0,0,0,10,23.74c12.33,25.81,31.37,45.15,56.47,58.65a32.75,32.75,0,0,0,9.5,3.77c2.19,.41,4.45,.62,6-1.37S457.17,474.71,456.26,472.69Z"
                />

                <path
                    className="cls-3"
                    d="M104.42,126a30.81,30.81,0,0,1-1.85,9.74c-3.3,8-10.85,11.6-19,9.09a23,23,0,0,1-8.58-4.93c-.68-.61-1.5-1.34-.74-2.38s1.81-.73,2.69,0a20.24,20.24,0,0,0,9.35,4.69,11.05,11.05,0,0,0,11.16-3.93c3.06-3.71,3.89-8.16,3.77-12.86a3,3,0,0,0-1.39-2.29,16,16,0,0,1-4.59-6.56,8.75,8.75,0,0,1-.5-1.8,1.47,1.47,0,0,1,.93-1.77c1-.34,1.57.15,1.93,1,.2,.48,.38,1,.59,1.44a13.37,13.37,0,0,0,14.91,8.1c.62-.1,1.22-.27,1.84-.33a1.52,1.52,0,0,1,1.83,1.28c.17,1-.44,1.53-1.33,1.8a17.82,17.82,0,0,1-8,.35C106.45,126.56,105.55,126.3,104.42,126Z"
                />

                <path
                    className="cls-4"
                    d="M159.1,55.84a20.36,20.36,0,0,0-2.27-9.41c-3-5.39-8.06-7.19-13.69-4.82-.28.12-.55.29-.83.42-1,.46-2.06.92-2.72-.29-.81-1.46.51-2,1.45-2.58a13,13,0,0,1,14.82,1.17,14.64,14.64,0,0,1,2.91,3.22,22.43,22.43,0,0,1,3.41,13.93c-.06,1.15-.31,2.44-1.92,2.22-1.42-.2-1.23-1.43-1.22-2.45C159,56.83,159.08,56.42,159.1,55.84Z"
                />

                <path
                    className="cls-5"
                    d="M66.86,102c3.38-.24,6.57,3.72,6.88,7.21a1.52,1.52,0,0,1-2.95.57,9.4,9.4,0,0,0-1.35-3.11c-1.41-1.82-2.66-2-4.33-.46-.78.73-1.54,1.25-2.4.54-1.05-.87-.5-1.89.16-2.75A4.59,4.59,0,0,1,66.86,102Z"
                />

                <path
                    className="cls-3"
                    d="M145.84,86.7a7.41,7.41,0,0,0-1.83-.24c-1.57-.14-3.07.43-5.17.65.48-.72.69-1,.93-1.38a28,28,0,0,0,5.08-21.53c-.66-4.13-2.34-7.81-6.28-9.88-3.52-1.86-7.82-1-11.12,2.26-5.93,5.86-8.17,13.14-7.68,21.28.37,6.15,2.39,11.4,9.09,13.67l-1.31,1.12c-.47.4-1,.8-1.41,1.22-1.72,1.63-2,2.56-1.06,3.34,1.41,1.12,2.28-.14,3.18-.92a28.34,28.34,0,0,1,15.66-7,12.78,12.78,0,0,0,1.84-.28,1.17,1.17,0,0,0,.9-1.13A1.21,1.21,0,0,0,145.84,86.7ZM132.32,65.78a8.55,8.55,0,0,1,2.14-8.58,1.76,1.76,0,0,1,2.23-.31,7.26,7.26,0,0,1,3.69,3.59,18.34,18.34,0,0,1,1.84,7.85c0,3.23-.93,4.06-3.59,3.54A7.83,7.83,0,0,1,132.32,65.78Z"
                />
            </svg>
            <div className="options ">
                <div className="color-options">
                    <label htmlFor="color-input">Color:</label>
                    <input
                        type="color"
                        id="color-input"
                        value={currentColor}
                        onChange={() => {}}
                    />
                </div>
                <div className="size">
                    <label htmlFor="size-input">Brush Size:</label>
                    <input
                        type="range"
                        min="5"
                        max="200"
                        value={currentSize}
                        onChange={() => {}}
                        id="size-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default PaintGame;
