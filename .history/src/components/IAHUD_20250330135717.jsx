// src/components/IAHUD.jsx
import "@/styles/IAHUD.css";

export default function IAHUD({ pvIA }) {
  return (
    <>
      <img className="hudPersoIA" src="img/persomaehud.png" alt="IA" />
      <img className="hpimghudIa" src="img/hpimghud.png" alt="hp" />
      <div className="iaPv">{ pvIA }</div>
    </>
  );
}