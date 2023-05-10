import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "../styles/tos.module.scss";

const Tos = () => {
  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography className={styles.title}>Termeni și Condiții</Typography>
      <ol className={styles.terms}>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Acceptarea Termenilor și Condițiilor
          </Typography>
          Prin utilizarea acestui site web și efectuarea de achiziții pe acesta,
          vă exprimați acordul cu privire la acești Termeni și Condiții. Vă
          rugăm să citiți cu atenție acești Termeni și Condiții înainte de a
          utiliza site-ul nostru.
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>Comandă și Plată</Typography>
          Plasarea unei comenzi pe site-ul nostru reprezintă o ofertă de
          cumpărare. Vă vom trimite o confirmare a comenzii prin e-mail, însă
          aceasta nu reprezintă acceptarea finală a comenzii. Ne rezervăm
          dreptul de a refuza sau de a anula o comandă în orice moment, fără a
          da explicații. Plata comenzilor se efectuează online prin metodele de
          plată disponibile pe site-ul nostru.
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Livrarea și Transportul
          </Typography>
          Livram produsele la adresa specificată de dumneavoastră în momentul
          plasării comenzii. Ne străduim să livrăm comenzile în cel mai scurt
          timp posibil, însă nu ne asumăm răspunderea pentru întârzierile
          cauzate de transportatori terți sau alte situații neprevăzute.
          Costurile de transport vor fi afișate în momentul plasării comenzii și
          vor fi suportate de către dumneavoastră, cu excepția cazului în care
          se specifică altfel pe site-ul nostru.
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Retur și Rambursare
          </Typography>
          Dacă nu sunteți mulțumit de produsele achiziționate, vă rugăm să ne
          contactați în termen de 7 zile de la primirea comenzii pentru a
          solicita un retur. Produsele trebuie returnate în starea lor
          originală, neutilizate și în ambalajul original. Costurile de
          returnare vor fi suportate de către dumneavoastră, cu excepția cazului
          în care returnarea se face din cauza unui produs defect sau a unei
          greșeli din partea noastră. Rambursarea va fi efectuată în termen de
          14 zile de la primirea produselor returnate și va include doar
          valoarea produselor returnate, fără costurile de transport.
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>Confidențialitate</Typography>
          Vom proteja confidențialitatea informațiilor dumneavoastră personale
          conform legislației în vigoare privind protecția datelor. Informațiile
          personale furnizate de către dumneavoastră, cum ar fi numele, adresa
          de e-mail și adresa de livrare, vor fi utilizate exclusiv în scopul
          procesării comenzilor și al comunicării cu dumneavoastră în legătură
          cu acestea.
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Drepturi de Autor și Proprietate Intelectuală
          </Typography>
          Toate drepturile de autor și proprietate intelectuală asupra
          conținutului site-ului nostru, inclusiv texte, imagini, logo-uri,
          design-uri și mărci înregistrate, aparțin site
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Protecția consumatorului
          </Typography>
          Mai multe informații găsiți aici:{" "}
          <a href="http://www.anpc.gov.ro/">http://www.anpc.gov.ro/</a>
        </li>
        <li className={styles.text}>
          <Typography className={styles.subtitle}>
            Soluționarea litigiilor
          </Typography>
          Mai multe informații despre soluționarea litigiilor, găsiți aici:{" "}
          <a href="https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=RO">
            https://webgate.ec.europa.eu/odr/main/index.cfm?event=main.home.show&lng=RO
          </a>
          <br />
          Pentru mai multe informații, sesizări și suport ne puteți contacta pe
          e-mail la info@henighonig.ro sau telefonic la 0741680054.
        </li>
      </ol>
    </Container>
  );
};

export default Tos;
