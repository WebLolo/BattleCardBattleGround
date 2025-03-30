// src/components/IAHUD.jsx
import "@/styles/IAHUD.css";

export default function IAHUD({ hp, avatar }) {
  return (
    <>
      <img className="hudPersoShop" src={avatar} alt="IA" />
      <img className="hpimghudIa" src="/img/hpimghud.png" alt="hp" />
      <div className="iaPv">{hp}</div>
    </>
  );
}
