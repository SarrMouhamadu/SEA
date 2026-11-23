#!/usr/bin/env bash
# ========================================================
# Script de Déploiement Automatique SEnergyS Africa vers OVH
# ========================================================
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "=========================================================="
echo "🚀 1. Compilation du frontend et synchronisation des fichiers..."
echo "=========================================================="
cd "$DIR/client"
npm run build
chmod -R 775 dist/api/data

echo ""
echo "=========================================================="
echo "📤 2. Envoi vers le serveur OVH (~/www)..."
echo "=========================================================="
echo "Saisissez votre mot de passe OVH si demandé :"
rsync -avzP dist/ senergysmk@ssh.cluster126.hosting.ovh.net:~/www/

echo ""
echo "=========================================================="
echo "✅ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !"
echo "Site web et API opérationnels sur votre hébergement OVH."
echo "=========================================================="
