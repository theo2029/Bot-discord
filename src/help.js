const help = `Liste des commandes 

.list -- Affiche la liste de cours

.add article1; article2 ... -- ajoute les articles donnés à la liste, possibilité d'écrire "4 pommes"

.remove article1; article2 ... -- enlève les articles donnés à la liste
    S'il y a plusieurs mêmes articles, tous sont retirés.

.clear -- supprime/clear la liste

.backup -- réassigne à la liste la dernière liste supprimée (.clear) si celle-ci le fut par erreur.

`

module.exports = help;
