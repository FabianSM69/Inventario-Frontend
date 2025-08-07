import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../api";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Reports() {
  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Productos Vendidos",
        data: [120, 150, 180, 200, 170],
        backgroundColor: "rgba(79, 147, 255, 0.6)",
        borderColor: "rgba(79, 147, 255, 1)",
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Productos Vendidos por Mes",
        color: "#4F93FF",
        font: {
          size: 20,
          family: "Inter",
          weight: "bold",
        },
        padding: 10
      }
    },
  };

  const pieData = {
    labels: ["Bebidas", "Dulces", "Enlatados", "Lácteos"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ["#FF5733", "#33FF57", "#3375FF", "#FFC300"],
        borderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Categorías más Vendidas",
        color: "#4F93FF",
        font: {
          size: 20,
          family: "Inter",
          weight: "bold",
        },
        padding: 10
      }
    },
  };

  useEffect(() => {
    const canvas = document.querySelector(".chartjs-render-monitor");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const center = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    const radius = Math.min(canvas.width, canvas.height) / 2;
    const angles = [Math.PI * 0.25, Math.PI * 1.25, Math.PI * 1.75, Math.PI * 0.75];
    const imgs = ["bebida", "dulces", "latas", "leche"];

    const clearOverlays = () => {
      document.querySelectorAll(".sector-img").forEach((el) => el.remove());
    };

    clearOverlays();

    angles.forEach((angle, i) => {
      const x = center.x + Math.cos(angle) * radius * 0.5;
      const y = center.y + Math.sin(angle) * radius * 0.5;

      const img = document.createElement("img");
      img.src = `/imagenes/${imgs[i]}.jpg`;
      img.className = "sector-img";
      img.style.position = "absolute";
      img.style.left = `${canvas.offsetLeft + x - 45}px`;
      img.style.top = `${canvas.offsetTop + y - 45}px`;
      img.style.width = "90px";
      img.style.height = "90px";
      img.style.borderRadius = "50%";
      img.style.objectFit = "cover";
      img.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
      img.style.zIndex = 5;
      img.style.transition = "transform 0.3s ease";

      canvas.parentNode.appendChild(img);
    });
  }, [pieData]);

  return (
    <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", marginTop: "120px", position: "relative" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          width: "100%",
          maxWidth: "1000px",
          fontSize: "1.1rem",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <p
          className="text-center"
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#444",
            marginBottom: "2rem",
          }}
        >
          Aquí puedes generar y visualizar los reportes del sistema.
        </p>

        <div style={{ width: "100%", height: "400px", margin: "40px 0" }}>
          <Bar data={barData} options={barOptions} />
        </div>

        <div style={{ width: "70%", height: "400px", margin: "40px auto", position: "relative" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sector-img:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default Reports;
