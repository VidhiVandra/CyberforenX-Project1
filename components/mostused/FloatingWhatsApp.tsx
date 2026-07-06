"use client";

import React from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "919321366585";
  const defaultMessage = "Hi, I have an inquiry about your premium carpets.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <>
      <style>{`
        .global-wa-float {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background-color: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .global-wa-float:hover {
          transform: scale(1.1);
          background-color: #20ba5a;
        }

        .global-wa-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #25d366;
          border-radius: 50%;
          opacity: 0.7;
          z-index: -1;
          animation: global-wa-pulsing 1.8s infinite;
        }

        @keyframes global-wa-pulsing {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="global-wa-float"
        aria-label="Chat on WhatsApp"
      >
        <div className="global-wa-pulse"></div>
        {/* Official WhatsApp SVG Logo */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.808 1.238h.005c5.507 0 9.99-4.478 9.99-9.987C22.007 6.478 17.52 2 12.012 2zm5.794 14.19c-.255.72-1.48 1.408-2.033 1.464-.492.052-1.13.085-3.27-.803-2.738-1.136-4.507-3.92-4.647-4.102-.134-.183-1.13-1.503-1.13-2.868 0-1.365.714-2.034.969-2.308.256-.274.561-.342.748-.342.187 0 .375.002.539.01.168.007.394-.064.617.47.227.545.776 1.895.842 2.033.067.137.112.297.021.48-.09.18-.135.297-.27.457-.136.16-.285.358-.407.48-.137.136-.28.285-.12.56.16.273.71 1.17 1.523 1.893.812.724 1.492.948 1.81 1.085.317.137.502.114.69-.102.187-.217.803-.935.918-1.255.116-.32.227-.274.394-.213.167.062 1.066.502 1.247.593.182.09.303.136.348.213.045.077.045.446-.21.116z"
          />
        </svg>
      </a>
    </>
  );
}
