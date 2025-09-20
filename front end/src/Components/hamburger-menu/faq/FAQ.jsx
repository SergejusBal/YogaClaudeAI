import styles from "./FAQ.module.css";
import { useState } from "react";

function FAQ() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      [index]: !prev[index]
    }));
  };

  const faqItems = [
    {
      question: "Nuo kokio amžiaus vaikai gali pradėti joga užsiėmimus?",
      answer: "Vaikai gali pradėti joga užsiėmimus nuo 3-4 metų amžiaus. Mes turime specialias programas skirtingoms amžiaus grupėms, pritaikytas vaikų poreikiams ir vystymuisi."
    },
    {
      question: "Kiek trunka vienas užsiėmimas?",
      answer: "Užsiėmimų trukmė priklauso nuo amžiaus grupės. Mažiesiems (3-5 m.) - 30 minučių, vyresnio amžiaus vaikams (6-12 m.) - 45 minutės."
    },
    {
      question: "Ar reikia turėti jokios patirties jogoje?",
      answer: "Ne, jokios ankstesnės patirties nereikia! Mūsų instruktoriai specialiai ruošia užsiėmimus pradedantiesiems ir padeda vaikams mokytis žingsnis po žingsnio."
    },
    {
      question: "Ką reikia atsivežti į užsiėmimą?",
      answer: "Rekomenduojame atsivežti: patogius, tamprius drabužius, vandens buteliuką ir šyptlą! Jogos kilimėlius mes pateikiame."
    },
    {
      question: "Ar tėvai gali dalyvauti užsiėmimuose?",
      answer: "Tai priklauso nuo programos. Mažiausiems vaikams (3-4 m.) tėvai gali dalyvauti kartu. Vyresnio amžiaus grupėse vaikai užsiima savarankiškai."
    },
    {
      question: "Kokia yra mūsų atšaukimo politika?",
      answer: "Užsiėmimą galite atšaukti iki 4 valandų prieš jo pradžią. Užsiėmimą galima perkelti į kitą laiką be papildomo mokesčio."
    },
    {
      question: "Ar siūlote individualius užsiėmimus?",
      answer: "Taip! Siūlome individualius užsiėmimus vaikams, kuriems reikia daugiau dėmesio arba tiems, kurie nori greičiau pažengti jogoje."
    },
    {
      question: "Ar joga saugi vaikams?",
      answer: "Absoliučiai taip! Vaikų joga yra pritaikyta jų amžiui ir fizinėms galimybėms. Mūsų instruktoriai yra specialiai parengti darbui su vaikais."
    }
  ];

  return (
    <div className={styles["faq-container"]}>
      <div className={styles["header-section"]}>
        <h1>Dažnai užduodami klausimai</h1>
      </div>

      <div className={styles["faq-content"]}>
        {faqItems.map((item, index) => (
          <div key={index} className={styles["faq-item"]}>
            <button
              className={`${styles["faq-question"]} ${openItems[index] ? styles["active"] : ""}`}
              onClick={() => toggleItem(index)}
              aria-expanded={openItems[index]}
            >
              <span className={styles["question-text"]}>{item.question}</span>
              <span className={styles["toggle-icon"]}>
                <svg viewBox="0 0 24 24" className={styles["icon-svg"]}>
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </span>
            </button>
            <div className={`${styles["faq-answer"]} ${openItems[index] ? styles["open"] : ""}`}>
              <div className={styles["answer-content"]}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles["contact-section"]}>
        <h2>Neradote atsakymo?</h2>
        <p>Susisiekite su mumis ir mielai atsakysime į visus jūsų klausimus!</p>
        <div className={styles["contact-buttons"]}>
          <a href="mailto:info@jogavaikams.lt" className={styles["contact-button"]}>
            <svg viewBox="0 0 24 24" className={styles["button-icon"]}>
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Rašykite
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQ;