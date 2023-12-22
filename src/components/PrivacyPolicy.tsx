import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box
      mx={{ base: "5vw", md: "10vw" }}
    >
      <Heading mb="4">Datenschutzrichtlinie für den Western Fornt Blog</Heading>

      <Text>
        Diese Datenschutzrichtlinie beschreibt, wie "Western Front Blog" (im
        Folgenden als "wir", "uns" oder "unsere" bezeichnet) Informationen
        sammelt, verwendet und weitergibt, wenn Sie unsere Website besuchen oder
        unsere Dienste nutzen.
      </Text>

      <Heading mt="4" mb="2" size="md">
        Informationen, die wir sammeln
      </Heading>

      <Text>
        <strong>Personenbezogene Daten</strong>
        <br />
        - <em>Google Login:</em> Wenn Sie sich über Ihr Google-Konto anmelden,
        sammeln wir bestimmte Informationen von Ihrem Google-Profil gemäss den
        Berechtigungen, die Sie gewähren. Dazu gehören Ihr Name, Ihre
        E-Mail-Adresse und Profilbild.
      </Text>

      <Text mt="2">
        <strong>Andere Informationen</strong>
        <br />
        - <em>Hochgeladene Artikel:</em> Wenn Sie Artikel auf unserer Website
        hochladen, können wir Informationen über diese Artikel sammeln,
        einschliesslich Text, Bilder und Metadaten.
      </Text>


      <Heading mt="4" mb="2" size="md">
        Wie wir Ihre Informationen verwenden
      </Heading>

      <Text>
        Wir verwenden die gesammelten Informationen, um Ihnen personalisierte
        Inhalte anzuzeigen, Ihnen den Zugang zu bestimmten Funktionen unserer
        Website zu ermöglichen, die Qualität und Leistung unserer Dienste zu
        verbessern und Ihnen relevanten Support und Kundendienst
        bereitzustellen.
      </Text>




      <Heading mt="4" mb="2" size="md">
        Kontaktinformationen
      </Heading>

      <Text>
        Für Fragen zur Datenschutzrichtlinie oder zur Ausübung Ihrer Rechte
        kontaktieren Sie uns bitte unter:
        <br />
        Ukraine PaW Group
        <br />
        Rosenstrasse 1, 8400 Winterthur
        <br />
        david.bischof@stud.kbw.ch
        <br />
        077 777 77 77
      </Text>
      <Box
        mt="4"
        mb="2"

      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10782.874265782464!2d8.7305643!3d47.4953957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a999e9fc4c32d%3A0xc5f240ca8689ae56!2sKantonsschule%20B%C3%BCelrain%20Winterthur%2C%20Wirtschaftsgymnasium%2C%20Handels-%20und%20Informatikmittelschule!5e0!3m2!1sde!2sch!4v1703274295797!5m2!1sde!2sch" width="600" height="450" loading="lazy" ></iframe>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
