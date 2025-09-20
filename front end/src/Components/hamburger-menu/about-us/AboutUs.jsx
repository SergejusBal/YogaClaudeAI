import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={styles["about-container"]}>
      <div className={styles["header-section"]}>
        <h1>Mūsų misija</h1>
      </div>

      <div className={styles["content-section"]}>
        <div className={styles["mission-section"]}>
          <p>
            Mes tikime, kad joga gali padėti vaikams augti stipriais, pasitikįs savimi ir ramiais.
            Mūsų tikslas - suteikti vaikams įrankius, kurie padės jiems valdyti emocijas,
            gerinti koncentraciją ir formuoti sveikas gyvenimo įpročius nuo mažens.
          </p>
        </div>

        <div className={styles["values-section"]}>
          <h2>Mūsų vertybės</h2>
          <div className={styles["values-grid"]}>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>💝</div>
              <h3>Meilė ir rūpestis</h3>
              <p>Kiekvienas vaikas yra ypatingas ir nusipelno individualaus dėmesio bei palaikymo.</p>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🌱</div>
              <h3>Augimas</h3>
              <p>Padedame vaikams augti ne tik fiziškai, bet ir emociškai bei dvasiškai.</p>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🎭</div>
              <h3>Žaidybiškas mokymasis</h3>
              <p>Joga turi būti linksma! Mokomės per žaidimus, istorijas ir kūrybiškumą.</p>
            </div>
            <div className={styles["value-item"]}>
              <div className={styles["value-icon"]}>🤝</div>
              <h3>Bendruomeniškumas</h3>
              <p>Kuriame šiltą ir palaikančią aplinką, kur vaikai jaučiasi saugūs ir priimti.</p>
            </div>
          </div>
        </div>

        <div className={styles["team-section"]}>
          <h2>Mūsų komanda</h2>
          <div className={styles["team-grid"]}>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <div className={styles["avatar-placeholder"]}>👩‍🏫</div>
              </div>
              <div className={styles["member-info"]}>
                <h3>Jolanta Petraitienė</h3>
                <p className={styles["member-title"]}>Vyresnioji instruktorė</p>
                <p className={styles["member-description"]}>
                  10 metų patirtis vaikų jogoje. Sertifikuota tarptautinė instruktorė.
                  Specializuojasi mindfulness ir kvėpavimo technikos.
                </p>
              </div>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <div className={styles["avatar-placeholder"]}>👨‍🏫</div>
              </div>
              <div className={styles["member-info"]}>
                <h3>Mindaugas Kairys</h3>
                <p className={styles["member-title"]}>Joga instruktorius</p>
                <p className={styles["member-description"]}>
                  Sporto šakų treneris ir joga instruktorius. Specializuojasi aktyvesnės jogos
                  užsiėmimais ir fizinio aktyvumo skatinimu.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;