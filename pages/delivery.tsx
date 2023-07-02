import { Container, Typography } from "@mui/material";
import React from "react";

const Delivery = () => {
  return (
    <Container>
      <Typography variant="h5">Cum comand?</Typography>
      Online pe www.henighonig.ro, urmărind procesul de comandă (plată ramburs
      sau online cu cardul). Telefonic la 0733 649 791, luând legătura cu un
      operator BeePower (plată ramburs). Prin e-mail la office@beepower.ro
      (plată ramburs). Vă rugăm să ne oferiți următoarele informații în cazul în
      care alegeți această modalitate de plasare a comenzii: Denumirea corectă a
      produselor dorite Gramajul produselor dorite Cantitatea (numărul de
      bucăți) dorită Codul promo (în cazul în care ați intrat în posesia unuia
      și doriți să-l folosiți) Adresa de livrare și/sau de facturare Date
      personale: nume, prenume, adresă de e-mail, telefon, data nașterii Alte
      informații sau mențiuni Pentru mai multe informații, sesizări și suport ne
      puteți contacta pe e-mail la office@beepower.ro sau telefonic la 0733 649
      791.
      <Typography variant="h5"> Metode de livrare disponibile:</Typography>
      <ul>
        <li>Livrare standard prin intermediul unei firme de curierat rapid</li>
      </ul>
      <Typography variant="h5"> Costul livrării:</Typography>
      <ul>
        <li>
          Livrare standard: 15 lei pentru comenzi sub 200 lei și gratuit pentru
          comenzi peste 200 lei
        </li>
      </ul>
      <Typography variant="h5">Timpul de livrare:</Typography>
      <ul>
        <li>
          Livrare standard: estimare de 2-3 zile lucrătoare de la plasarea
          comenzii
        </li>
      </ul>
      <Typography variant="h5"> Politica de returnare:</Typography>
      <ul>
        <li>
          Produsele alimentare perisabile, cum ar fi mierea, nu pot fi returnate
          din motive de siguranță alimentară, dar în cazul în care există
          probleme cu calitatea produselor, clienții pot contacta serviciul de
          asistență pentru clienți pentru a primi asistență.
        </li>
      </ul>
    </Container>
  );
};

export default Delivery;
