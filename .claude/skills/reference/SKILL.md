---
name: reference
description: Použij při stavbě nebo úpravě sekce Reference/recenze — citace a hodnocení klientů.
---

# Sekce Reference

## Účel

Sociální důkaz — potenciální klient vidí, že si od Tomáše masáž objednali jiní
a byli spokojení. Tahle sekce je citlivá na důvěryhodnost: jedna odhalená
vymyšlená recenze zničí důvěru v celý web.

## Fakta a pravidlo nulové fabrikace

**Žádné jméno klienta, citace ani hodnocení nesmí být vymyšlené.** Toto je
striktnější aplikace pravidla z CLAUDE.md ("nikdy si nevymýšlej... jména klientů
ani citace referencí") — u této sekce neexistuje výjimka ani "jen jako placeholder
text v podobném duchu".

Dokud klient nedodá reálné reference:
- Sekce obsahuje jasně označený placeholder: `<!-- TODO: nahradit reálnými
  referencemi klientů --->`
- Placeholder v UI je buď skrytý (sekce se nerenderuje), nebo viditelně označený
  jako ukázka struktury (např. "zde budou reference klientů"), nikdy vydávaný za
  reálnou recenzi.
- Pokud klient poskytne reference z Google/Facebooku, ověřit přesné znění citace
  a jméno tak, jak bylo dodáno — needitovat/nezkracovat způsobem měnícím význam.

## Struktura

- Karta reference: citace, jméno (nebo iniciála pokud klient preferuje anonymitu),
  volitelně kontext (jaký typ masáže/služby).
- Pokud existuje odkaz na externí platformu (Google recenze), odkázat ven místo
  kopírování celého obsahu bez svolení.
- Sekce nesmí blokovat hlavní konverzní cestu — je podpůrná, ne primární CTA.

## Doplňky

- **Alternativa k placeholderu**: místo prázdné sekce s TODO lze postavit
  sekci "Zkušenosti" založenou na ověřitelných faktech místo citací, např.
  "7 let u profesionálních fotbalistů FK Mladá Boleslav" — pouze fakta
  potvrzená v CLAUDE.md, ne vymyšlená čísla typu "stovky klientů" bez podkladu.
- Výchozí formát jména u citace: jméno + iniciála příjmení (ne celé příjmení)
  kvůli GDPR, pokud klient nedá výslovný souhlas se zveřejněním celého jména.

## Checklist před dokončením sekce

- [ ] Žádná citace, jméno ani hodnocení není vymyšlené
- [ ] Chybějící reálné reference jsou explicitně označené TODO, ne tiše nahrazené
- [ ] Pokud recenze pochází z externí platformy, znění odpovídá originálu
- [ ] Jméno u citace je ve formátu jméno + iniciála příjmení, pokud klient nedal souhlas s celým jménem
