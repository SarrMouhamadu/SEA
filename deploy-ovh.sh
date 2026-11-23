#!/usr/bin/env bash
# ========================================================
# Script de Déploiement Automatique SEnergyS Africa vers OVH
# ========================================================
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=========================================================="
echo "🚀 1. Compilation du frontend et synchronisation..."
echo "=========================================================="
cd "$DIR/client"
npm run build
chmod -R 775 dist/api/data

echo ""
echo "=========================================================="
echo "📤 2. Envoi vers le serveur OVH..."
echo "=========================================================="
echo "Saisissez votre mot de passe OVH si demandé :"

# Synchronisation du site et de l'API dans ~/www/ (sans écraser avec un .ovhconfig local)
rsync -avzP --exclude='.ovhconfig' dist/ senergysmk@ssh.cluster126.hosting.ovh.net:~/www/

# Placement du fichier .ovhconfig à la racine de l'hébergement (~/.ovhconfig)
rsync -avzP dist/.ovhconfig senergysmk@ssh.cluster126.hosting.ovh.net:~/.ovhconfig

# Nettoyage de tout .ovhconfig résiduel dans ~/www/ pour éviter tout conflit Apache 501
ssh senergysmk@ssh.cluster126.hosting.ovh.net "rm -f ~/www/.ovhconfig"

echo ""
echo "=========================================================="
echo "✅ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !"
echo "Site web et API opérationnels sur votre hébergement OVH."
echo "=========================================================="
