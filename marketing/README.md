# HomeFix 224 - Kit Marketing

## Fichiers principaux

- `exports/homefix-224-logo-principal.png` : logo horizontal.
- `exports/homefix-224-logo-fond-clair.png` : logo horizontal pour fond blanc ou fond clair.
- `exports/homefix-224-logo-blanc-transparent.png` : logo blanc transparent pour visuels sombres ou photos.
- `exports/homefix-224-icone-transparente.png` : icône seule transparente.
- `exports/homefix-224-photo-profil.png` : photo de profil WhatsApp Business, Facebook, Instagram.
- `exports/homefix-224-banniere-facebook.png` : couverture Facebook.
- `exports/homefix-224-pub-plomberie.png` : publicité carrée plomberie.
- `exports/homefix-224-pub-electricite-clim.png` : publicité carrée électricité / climatisation.
- `exports/homefix-224-pub-maintenance.png` : publicité carrée maintenance bureaux / résidences.
- `exports/homefix-224-pub-services-domicile.png` : publicité carrée générale services à domicile.
- `exports/homefix-224-statut-urgence.png` : statut WhatsApp vertical urgence.
- `exports/homefix-224-statut-services.png` : statut WhatsApp vertical services.
- `exports/homefix-224-statut-comment-ca-marche.png` : statut WhatsApp / story Instagram expliquant le fonctionnement.
- `exports/homefix-224-flyer-digital.png` : flyer digital pour WhatsApp, Facebook et Instagram.

## Utilisation recommandée

- Profil WhatsApp/Facebook/Instagram : `homefix-224-photo-profil.png`
- Couverture Facebook : `homefix-224-banniere-facebook.png`
- Publication de lancement : `homefix-224-pub-services-domicile.png`
- Publication service plomberie : `homefix-224-pub-plomberie.png`
- Publication service électricité/clim : `homefix-224-pub-electricite-clim.png`
- Publication PME/bureaux : `homefix-224-pub-maintenance.png`
- Statut WhatsApp 1 : `homefix-224-statut-urgence.png`
- Statut WhatsApp 2 : `homefix-224-statut-comment-ca-marche.png`
- Statut WhatsApp 3 : `homefix-224-statut-services.png`
- Flyer à envoyer en message privé : `homefix-224-flyer-digital.png`

## Textes

- `campagne-lancement.md` contient les textes WhatsApp, Facebook, Instagram, le calendrier de lancement et le script de qualification prestataire.

## Sources modifiables

- `logo-homefix-224.svg` : logo horizontal vectoriel.
- `logo-homefix-224-light.svg` : logo vectoriel pour fond clair.
- `logo-homefix-224-white.svg` : logo vectoriel blanc transparent.
- `logo-mark-homefix-224.svg` : logo carré vectoriel.
- `logo-mark-homefix-224-transparent.svg` : icône vectorielle transparente.
- `launch-kit.html` : artboards HTML/CSS utilisés pour exporter les PNG.
- `source-images/` : images réalistes HomeFix utilisées dans les publicités et statuts.

## Export

Pour regénérer les PNG après modification :

```bash
/Users/oumdia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/export-marketing-assets.mjs
```
