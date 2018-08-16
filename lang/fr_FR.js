var translations = [];

// Menus
translations["File"] = "Fichier";
translations["New"] = "Nouveau";
translations["Open"] = "Ouvrir";
translations["Save"] = "Enregistrer";
translations["View"] = "Affichage";
translations["Theme"] = "Thème";
translations["Dark"] = "Sombre";
translations["Light"] = "Clair";
translations["The modification will be applied at the next startup of MyViz"] = "La modification sera appliquée au prochain démarrage de MyViz";
translations["Systems"] = "Systèmes";
translations["Load"] = "Ouvrir";
translations["About T-Quad"] = "A propos de T-Quad";
translations["Help"] = "Aide";
translations["About MyViz"] = "A propos de Myviz";
translations["Upgrade MyViz"] = "Mise à jour de Myviz";
translations["This dashboard has been saved with a newer version of MyViz. It may not work as expected.\n\nIt is recommended to upgrade MyViz by clicking on Help -> Upgrade MyViz.\n\nIf you don't want to upgrade MyViz and if you don't want to see this message anymore, you can save this dashboard with your current version of MyViz."] = "Ce tableau de bord a été sauvegardé avec une version plus récente de MyViz. Il risque de ne pas fonctionner comme prévu.\n\nIl est conseillé de mettre MyViz à jour en cliquant sur Aide -> Mise à jour de Myviz.\n\nSi vous ne voulez pas mettre à jour MyViz et si vous ne voulez plus voir ce message, vous pouvez sauvegarder ce tableau de bord avec votre version actuelle.";
translations["Tutorials"] = "Tutoriels";
translations["Last opened: "] = "Dernier fichier ouvert: ";
translations["Default (OS informations)"] = "Par défaut (informations de l'OS)";
translations["Custom (click to edit): "] = "Personnalisé (cliquer pour modifier): ";
translations["Startup"] = "Démarrage";
translations["Parameters"] = "Paramètres";
translations["Tutorials"] = "Tutoriels";


// index.html
translations["#load"] = "Ouvrir";
translations["#save"] = "Enregistrer";
translations["#pane"] = "Ajouter un panneau";
translations["#datasources_list"] = "SOURCES DE DONNEES";
translations["#name"] = "Nom";
translations["#last_updated"] = "Derni&egrave;re mise &agrave; jour";
translations["#add"] = "Ajouter";
translations["#pretty"] = "[Normal]";
translations["#mini"] = "[Mini]";

// js/freeboard.js
translations["Save"] = "Enregistrer";
translations["Cancel"] = "Annuler";
translations["never"] = "jamais";
translations["Datasource"] = "Source de données";
translations["Widget"] = "Widget";
translations["Pane"] = "Panneau";
translations["Title"] = "Titre";
translations["Columns"] = "Colonnes";
translations['<p>Are you sure you want to delete this '] = '<p>Etes-vous sûr(e) de vouloir effacer ce ';
translations["Confirm Delete"] = "Confirmer la suppression";
translations["Yes"] = "Oui";
translations["No"] = "Non";
translations["<option>Select a type...</option>"] = "<option>Sélectionner un type...</option>";
translations["Name"] = "Nom";
translations["Type"] = "Type";

// extensions/button.widgets.js
translations["Button"] = "Bouton";
translations["A Button widget for serial or socket communications."] = "Contrôle de type bouton pour les communications série ou socket";
translations["Title"] = "Titre";
translations["Variable"] = "Variable";
translations["On value"] = 'Valeur "allumé"';
translations["Off value"] = 'Valeur "éteint"';
translations["Caption on button"] = 'Texte sur le bouton';
translations["Switch on"] = 'Allumer';

// extensions/buttonloaddashboard.widgets.js
translations["Button Load Dashboard"] = "Bouton ouverture dashboard";
translations["A Button widget that loads a dashboard when clicked."] = "Contrôle de type bouton permettant de charger un nouveau tableau de bord";
translations["Title"] = "Titre";
translations["Caption on button"] = 'Texte sur le bouton';
translations["Load"] = 'Ouvrir';
translations["Dashboard"] = 'Tableau de bord';
translations["Height"] = 'Hauteur';

// extensions/clock.datasources.js
translations["Clock"] = "Horloge";
translations["Refresh Every"] = "Rafraîchir toutes les";
translations["seconds"] = "secondes";

// extensions/closedloop.widgets.js
translations["Display closed loop"] = "Affichage boucle fermée";
translations["Reference"] = "Consigne";
translations["Variable corresponding to control reference"] = "Variable correspondant à la consigne d'asservissement";
translations["Error"] = "Erreur";
translations["Variable corresponding to the error between the reference and the output"] = "Variable correspondant à l'erreur (différence entre la consigne et la sortie)";
translations["Command"] = "Commande";
translations["Variable corresponding to the output of the controller"] = "Variable correspondant à la sortie du correcteur";
translations["Output"] = "Sortie";
translations["Variable corresponding to the output of the closed loop"] = "Variable correspondant à la sortie de la boucle fermée";

// extensions/colorwheel.widgets.js
translations["Color Wheel"] = "Roue des couleurs";
translations["Title"] = "Titre";
translations["Variable"] = "Variable";
translations["Variable corresponding to the color (in hexadecimal)"] = "Variable correspondant à la couleur (en hexadécimal)";
translations["Initial value of the color"] = "Valeur initiale de la couleur";

// extensions/csv.datasources.js
translations["CSV File"] = "Fichier CSV";
translations["Click into this text input in order to select the file."] = "Cliquez dans cette zone d'entrée textuelle pour choisir le fichier";
translations["Use header for variables to read"] = "Utiliser l'entête pour le nom des variables à lire";
translations["Name of the variables to read (separated by comma), only in case you don't use header."] = "Noms des variables à lire (séparés par des virgules), uniquement dans le cas où l'en-tête n'est pas utilisé.";
translations["Lines to skip"] = "Sauter des lignes";
translations["Includes header."] = "Inclus l'en-tête.";

// extensions/dweetio.datasources.js
translations["Thing Name"] = "Nom de l'objet";
translations["Example: salty-dog-1"] = "Exemple: salty-dog-1";

// extensions/gauge.widgets.js
translations["Gauge"] = "Jauge";
translations["Title"] = "Titre";
translations["Value"] = "Valeur";
translations["Units"] = "Unité";
translations["Minimum"] = "Minimum";
translations["Maximum"] = "Maximum";
translations["Gradient"] = "Gradient";

// extensions/googlemap.widgets.js
translations["Latitude"] = "Latitude";

// extensions/html.widgets.js
translations["Can be literal HTML, or javascript that outputs HTML."] = "Peut être du HTML brut ou du javascript qui produit du HTML";
translations["Height Blocks"] = "Hauteur en nombre de blocs";
translations["A height block is around 60 pixels"] = "La hauteur d'un bloc est environ 60 pixels";

// extensions/http.datasources.js
translations["Variables (if any) used in the URL above, separated by comma"] = "Variables éventuellement utilisées dans l'URL ci-dessus, séparées par des virgules";
translations["Put -1 for a one-shot request."] = "Mettre -1 pour un envoi manuel";
translations["Send if request has not changed"] = "Envoyer si la requête est inchangée";
translations['Whether or not the request must be sent if the "refresh" parameter above is > 0 and if the request has not changed.'] = 'Détermine si la requête doit être envoyée même si elle est inchangée et si le paramètre de rafraîchissement ci-dessus est > 0';

// extensions/identification.widgets.js
translations["Identification of electrical parameters"] = "Identification des paramètres électriques";
translations["Identification of mechanical parameters"] = "Identification des paramètres mécaniques";
translations["Resistance: "] = "Résistance: ";
translations["Inductance: "] = "Inductance: ";
translations["Measured current"] = 'Courant mesuré';
translations["Identified current"] = 'Courant identifié';
translations["Torque constant: "] = "Constante de couple: ";
translations["Inertia: "] = "Inertie: ";
translations["Damping: "] = "Frottement: ";
translations["Measured speed"] = 'Vitesse mesurée';
translations["Identified speed"] = 'Vitesse identifiée';
translations["Identification"] = "Identification";
translations["Identification of DC Motor parameters"] = "Identification des paramètres d'un moteur à courant continu.";
translations["Time (X axis)"] = "Temps (axe X)";
translations["Current"] = "Courant";
translations["Angular speed"] = "Vitesse de rotation";
translations["Current window"] = "Fenêtre en courant";
translations["Length of identification window for the current"] = "Longueur de la fenêtre d'identification en courant";
translations["Steady state start time on speed"] = "Début du régime permanent sur la vitesse";
translations["Take a margin so that you are sure that the speed has reached the steady state"] = "Prenez une marge pour être sûr qu'après cet instant la vitesse a atteint le régime permanent";
translations["Motor voltage during current try"] = "Tension moteur essai en courant";
translations["Motor voltage during speed try"] = "Tension moteur essai en vitesse";
translations["Gear ratio"] = "Rapport de réduction";

// extensions/indicator.widgets.js
translations["Indicator Light"] = "Indicateur lumineux";
translations["Title"] = "Titre";
translations["Value"] = "Valeur";
translations["On Text"] = 'Texte "allumé"';
translations["Off Text"] = 'Texte "éteint"';

// extensions/json.datasources.js
translations["Try thingproxy"] = "Essayer thingproxy";
translations['A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href="https://github.com/Freeboard/thingproxy" target="_blank">More information</a>.'] = 'Une connexion JSON directe sera essayée en premier ; si elle échoue, une connexion JSONP sera essayée alors. Si elle échoue également, vous pouvez essayer thingproxy, qui peut résoudre de nombreux problèmes de connexion aux APIs. <a href="https://github.com/Freeboard/thingproxy" target="_blank">Plus d\\\'informations (en anglais)</a>.';
translations["Refresh Every"] = "Rafraîchir toutes les";
translations["seconds"] = "secondes";
translations["Method"] = "Méthode";
translations["Body"] = "Corps";
translations["The body of the request. Normally only used if method is POST"] = "Corps de la requête. Normalement, utilisé uniquement si la méthode est POST";
translations["Headers"] = "En-tête";
translations["Name"] = "Nom";
translations["Value"] = "Valeur";

// extensions/octoblu.datasources.js
translations["your device UUID"] = "UUID de votre device";
translations["your device TOKEN"] = "TOKEN de votre device";
translations["Server"] = "Serveur";
translations["your server"] = "Votre serveur";
translations["Port"] = "Port";
translations["server port"] = "Port de votre serveur";

// extensions/openweathermap.datasources.js
translations["Open Weather Map API"] = "API Open Weather Map";
translations["Location"] = "Lieu";
translations["Example: London, UK"] = "Exemple: Paris, FR";
translations["Units"] = "Unité";
translations["Metric"] = "Métrique";
translations["Imperial"] = "Impériale";
translations["Refresh Every"] = "Rafraîchir toutes les";
translations["seconds"] = "secondes";

// extensions/picture.widgets.js
translations["Picture"] = "Image";
translations["Image URL"] = "URL de l'image";
translations["Refresh Every"] = "Rafraîchir toutes les";
translations["seconds"] = "secondes";
translations["Leave blank if the image doesn't need to be refreshed"] = "Laisser vide si l'image ne doit pas être rafraîchie";

// extensions/pie.widgets.js
translations["Pie Graph"] = "Graphe en Camembert";
translations["Variables"] = "Variables";
translations["Include Label"] = "Inclure les labels";
translations["Include Legend"] = "Inclure la légende";
translations["Legend / Labels"] = "Légende / Labels";
translations["Comma-separated texts"] = "Textes séparés par des virgules";

// extensions/playback.datasources.js
translations["Data File URL"] = "URL du fichier de données";
translations["A link to a JSON array of data."] = "Lien vers un tableau de données JSON";
translations["Is JSONP"] = "JSONP";
translations["Loop"] = "Boucler";
translations["Rewind and loop when finished"] = "Boucler depuis le début lorsque terminé";
translations["Refresh Every"] = "Rafraîchir toutes les";
translations["seconds"] = "secondes";

// extensions/plot.widgets.js
translations["Plot"] = "Tracé";
translations[" (right axis)"] = " (axe droit)";
translations["Title"] = "Titre";
translations["X axis"] = "Axe X";
translations["Seconds from start"] = "Secondes depuis le début";
translations["Column of datasource"] = "Colonne de la source de données";
translations['When choosing "Seconds from start", the data are timestamped when they are received'] = 'Si vous avez choisi "Secondes depuis le début", les données sont étiquettées temporellement lorsqu\\\'elles sont reçues';
translations["Time (X axis)"] = "Temps (axe X)";
translations['Fill only if you chose "Column of datasource" above.'] = 'Remplir uniquement si vous avez choisi "Colonne de la source de données" plus haut';
translations["X stop value"] = "Valeur de fin en X";
translations['X value at which the plot should stop. Put "inf" for continuous plot.'] = 'Valeur de X à laquelle arrêter le tracé. Mettre "inf" pour un tracé continu.';
translations["Time Window"] = "Fenêtre temporelle";
translations["Maximum length of sliding time window. It will be automatically decreased so that it does not display more than 500 points."] = "Longueur de la fenêtre temporelle glissante. Elle sera réduite automatiquement pour qu'elle n'affiche pas plus de 500 points.";
translations["Left Y axis values"] = "Valeur de l'axe Y gauche";
translations["Left Y axis minimum range"] = "Intervalle minimum sur l'axe Y gauche";
translations["Right Y axis values"] = "Valeur de l'axe Y droit";
translations["Right Y axis minimum range"] = "Intervalle minimum sur l'axe Y droit";
translations["Two values separated by a comma. This range will be automatically extended if necessary, but it will not be reduced."] = "Deux valeurs séparées par des virgules. Cet intervalle sera automatiquement étendu si nécessaire, mais iil ne sera pas réduit";
translations["Include Legend"] = "Inclure la légende";
translations["Legend"] = "Légende";
translations["Comma-separated for multiple plots, left variables first, then right variables"] = "Séparer par des virgules en cas de tracés multiples. Commencer par les variables de l'axe gauche, puis celles de l'axe droit";
translations["Height Blocks"] = "Hauteur en nombre de blocs";
translations["A height block is around 60 pixels"] = "La hauteur d'un bloc est environ 60 pixels";
translations["Pausable"] = "Pausable";
translations["Refresh Period"] = "Période de rafraîchissement";
translations["Increase this value in case of rendering problems with multiple plots."] = "Augmenter cette valeur si l'affichage est saccadé ou si vous tracez de nombreuses courbes.";
translations["Mean value"] = "Valeur moyenne";
translations["Legend on X axis"] = "Légende sur l'axe des abscisses";

// extensions/pointer.widgets.js
translations["Pointer"] = "Pointeur";
translations["Direction"] = "Direction";
translations["In degrees"] = "En degrés";
translations["Value Text"] = "Texte correspondant à la valeur";
translations["Units"] = "Unité";

// extensions/select.widgets.js
translations["Datasource type not supported by this widget"] = "Type de source de données non supporté par ce contrôle";
translations["Select"] = "Liste déroulante";
translations["Title"] = "Titre";
translations["Datasource"] = "Source de données";
translations["You *must* create first a datasource with the same name"] = "Vous *devez* créer tout d'abord une source de données avec ce nom";
translations["Variable"] = "Variable";
translations["List of captions"] = "Liste de textes";
translations["Use the comma as separator"] = "Utiliser la virgule comme séparateur";
translations["List of values"] = "Liste de valeurs";
translations["Use the comma as separator"] = "Utiliser la virgule comme séparateur";

// extensions/serialport.datasources.js
translations["Serialport"] = "Port série";
translations["A real-time stream datasource from Serial port."] = "Flux de données temps-réel provenant du port série.";
translations["Port"] = "Port";
translations["Baudrate"] = "Nombre de bauds";
translations["Variables to read"] = "Variables à lire";
translations["Name of the variables to read, separated by comma"] = "Nom des variables à lire, séparées par des virgules";
translations["Variables to send"] = "Variables à envoyer";
translations["Name of the variables to send, separated by comma"] = "Nom des variables à envoyer, séparées par des virgules";
translations["Refresh rate for sending data"] = "Taux de rafraîchissement pour l'envoi des données";
translations["Refresh rate for sending data ( >= 10 ms). Data will be sent even if control values are not changed.<br>The dashboard must be reloaded if the refresh rate is modified."] = "Taux de rafraîchissement pour l'envoi des données. Les données seront envoyées même si la valeur des contrôles auxquelles elles sont connectées sur le tableau de bord est inchangé.<br>Le tableau de bord doit être rechargé si ce taux de rafraîchissement est modifié.";
translations["milliseconds"] = "millisecondes";
translations["Separator"] = "Séparateur";
translations["Separator character for received and (optionally) sent values"] = "Séparateur des données reçues (et éventuellement envoyées)";
translations["Checksum method"] = 'Méthode de "somme de contrôle"';
translations["If values are sent, a checksum will be automatically added in variable '_crc', computed from the other values."] = 'Si des données sont envoyées, une "somme de contrôle" sera automatiquement ajoutée dans une variable "_crc", calculée à partir des autres valeurs';
translations["None"] = "Aucune";
translations["Sum"] = "Somme";
translations["Sum, twice"] = "Somme, deux fois de suite";
translations["String concatenation"] = "Concaténation de chaîne de caractères";
translations["Immediate startup"] = "Démarrage immédiat";
translations["Define whether or not you want to start the communication when the dashboard is loaded."] = "Permet de définir si vous souhaitez ou non démarrer la communication lors de l'ouverture du tableau de bord.";

// extensions/signalgeneration.widgets.js
translations["Pulse"] = "Impulsion";
translations["Unit"] = "Unité";
translations["Sine"] = "Sinus";
translations["Trapezoid"] = "Trapèze";
translations["Triangle"] = "Triangle";
translations["Ramp"] = "Rampe";
translations["Signal type"] = "Type de signal";
translations["Offset"] = "Offset";
translations["Amplitude"] = "Amplitude";
translations["Frequency (Hz)"] = "Frequence (Hz)";
translations["Rising time (s)"] = "Temps de montée (s)";
translations["Falling time (s)"] = "Temps de descente (s)";
translations["Pulse width (%)"] = "Largeur d'impulsion (%)";
translations["Width (s)"] = "Largeur (s)";
translations["Delay before ramp (s)"] = "Délai avant la rampe (s)";
translations["Signal Generation"] = "Génération de signal";
translations["A Signal Generation widget."] = "Widget de génération de signal";
translations["Variable for signal type"] = "Variable pour le type de signal";
translations["Only the sine is centered around 0.<br /><hr>"] = "Seul le sinus est centré autour de 0.<br /><hr>";
translations["Variable for offset"] = "Variable pour l'offset";
translations["Formula for offset"] = "Formule pour l'offset";
translations["Initial value for offset"] = "Valeur initiale pour l'offset";
translations["Min for offset"] = "Min pour l'offset";
translations["Max for offset"] = "Max pour l'offset";
translations["Number of decimals for offset"] = "Nombre de décimales pour l'offset";
translations["Reset value for offset"] = "Valeur de réinit. pour l'offset";
translations["Caption on reset button for offset"] = "Texte sur le bouton de réinit pour l'offset";
translations["Variable for amplitude"] = "Variable pour l'amplitude";
translations["Formula for amplitude"] = "Formule pour l'amplitude";
translations["Initial value for amplitude"] = "Valeur initiale pour l'amplitude";
translations["Min for amplitude"] = "Min pour l'amplitude";
translations["Max for amplitude"] = "Max pour l'amplitude";
translations["Number of decimals for amplitude"] = "Nombre de décimales pour l'amplitude";
translations["Reset value for amplitude"] = "Valeur de réinit pour l'amplitude";
translations["Caption on reset button for amplitude"] = "Texte sur le bouton de réinit pour l'amplitude";
translations["Variable for frequency"] = "Variable pour la fréquence";
translations["Formula for frequency"] = "Formule pour la fréquence";
translations["Initial value for frequency"] = "Valeur initiale pour la fréquence";
translations["Min for frequency"] = "Min pour la fréquence";
translations["Max for frequency"] = "Max pour la fréquence";
translations["Number of decimals for frequency"] = "Nombre de décimales pour la fréquence";
translations["Reset value for frequency"] = "Valeur de réinit pour la fréquence";
translations["Caption on reset button for frequency"] = "Texte sur le bouton de réinit pour la fréquence";
translations["Variable for rising time"] = "Variable pour le temps de montée";
translations["Formula for rising time"] = "Formule pour le temps de montée";
translations["Initial value for rising time"] = "Valeur initiale pour le temps de montée";
translations["Min for rising time"] = "Min pour le temps de montée";
translations["Max for rising time"] = "Max pour le temps de montée";
translations["Number of decimals for rising time"] = "Nombre de décimales pour le temps de montée";
translations["Reset value for rising time"] = "Valeur de réinit pour le temps de montée";
translations["Caption on reset button for rising time"] = "Texte sur le bouton de réinit pour le temps de montée";
translations["Variable for falling time"] = "Variable pour le temps de descente";
translations["Formula for falling time"] = "Formule pour le temps de descente";
translations["Initial value for falling time"] = "Valeur initiale pour le temps de descente";
translations["Min for falling time"] = "Min pour le temps de descente";
translations["Max for falling time"] = "Max pour le temps de descente";
translations["Number of decimals for falling time"] = "Nombre de décimales pour le temps de descente";
translations["Reset value for falling time"] = "Valeur de réinit pour le temps de descente";
translations["Caption on reset button for falling time"] = "Texte sur le bouton de réinit pour le temps de descente";
translations["Variable for percentage"] = "Variable pour le pourcentage";
translations["Formula for percentage"] = "Formule pour le pourcentage";
translations["Initial value for percentage"] = "Valeur initiale pour le pourcentage";
translations["Min for percentage"] = "Min pour le pourcentage";
translations["Max for percentage"] = "Max pour le pourcentage";
translations["Number of decimals for percentage"] = "Nombre de décimales pour le pourcentage";
translations["Reset value for percentage"] = "Valeur de réinit pour le pourcentage";
translations["Caption on reset button for percentage"] = "Texte sur le bouton de réinit pour le pourcentage";
translations["Variable for width"] = "Variable pour la largeur";
translations["Formula for width"] = "Formule pour la largeur";
translations["Initial value for width"] = "Valeur initiale la largeur";
translations["Min for width"] = "Min pour la largeur";
translations["Max for width"] = "Max pour la largeur";
translations["Number of decimals for width"] = "Nombre de décimales pour la largeur";
translations["Reset value for width"] = "Valeur de réinit pour la largeur";
translations["Caption on reset button for width"] = "Texte sur le bouton de réinit pour la largeur";

// extensions/slider.widgets.js
translations["Datasource type not supported by this widget"] = "Type de source de données non supporté par ce contrôle";
translations["Slider"] = "Curseur";
translations["A Slider widget for serial or socket communications."] = "Contrôle de type curseur pour les communications série ou socket";
translations["Title"] = "Titre";
translations["Datasource"] = "Source de données";
translations["You *must* create first a datasource with the same name"] = "Vous *devez* créer tout d'abord une source de données avec ce nom";
translations["Variable"] = "Variable";
translations["Formula"] = "Formule";
translations['The value really sent will be computed from the slider value. <br />Use "x" as slider value'] = 'La valeur réellement envoyée sera calculée à partir de la valeur du curseur. <br />Utiliser "x" comme valeur du curseur';
translations["Initial value"] = "Valeur initiale";
translations["Min"] = "Min";
translations["Max"] = "Max";
translations["Number of decimals"] = "Nombre de décimales";
translations["Reset value"] = "Valeur de réinitialisation";
translations["Caption on reset button"] = "Texte sur le bouton de réinitialisation";
translations["Reset"] = "Réinitialisation";

// extensions/sparkline.widgets.js
translations["Sparkline"] = "Sparkline";
translations["Title"] = "Titre";
translations["Value"] = "Valeur";
translations["Include Legend"] = "Inclure la légende";
translations["Legend"] = "Légende";
translations["Comma-separated for multiple sparklines"] = "Séparer par des virgules pour de multiples sparklines";

// extensions/switchbutton.widgets.js
translations["Datasource type not supported by this widget"] = "Type de source de données non supporté par ce contrôle";
translations["Switch button"] = "Interrupteur";
translations["A Switchbutton widget for serial or socket communications."] = "Contrôle de type interrupteur pour les communications série ou socket";
translations["A Switchbutton widget for serial, socket or http communications."] = "Contrôle de type interrupteur pour les communications série, socket ou http";
translations["Title"] = "Titre";
translations["Datasource"] = "Source de données";
translations["You *must* create first a datasource with the same name"] = "Vous *devez* créer tout d'abord une source de données avec ce nom";
translations["Variable"] = "Variable";
translations['"YES" text'] = 'Texte correspondant à "YES"';
translations['"YES" value'] = 'Valeur "YES"';
translations['Value corresponding to "YES" position'] = 'Valeur corrspondant à la position "YES"';
translations["Corresponding numeric value is 1"] = "La valeur numérique correspondante est 1";
translations['"NO" text'] = 'Texte correspondant à "NO"';
translations['"NO" value'] = 'Valeur "NO"';
translations['Value corresponding to "NO" position'] = 'Valeur corrspondant à la position "NO"';
translations["Corresponding numeric value is 0"] = "La valeur numérique correspondante est 0";
translations["Corresponding value is defined below"] = "La valeur correspondante est définie ci-dessous";
translations["Initial state"] = "Etat initial";

// extensions/switchserialport.widgets.js
translations["Datasource type not supported by this widget"] = "Type de source de données non supporté par ce contrôle";
translations["Switch Serial Port"] = "Interrupteur Port Série";
translations["A Switchbutton widget for serial communications."] = "Contrôle de type interrupteur pour les communications série";
translations["Title"] = "Titre";
translations["Serial datasource"] = "Source de données séries";
translations["Datasource name corresponding to the serial port to switch. You *must* create first a datasource with the same name"] = "Source de données correspondant au port série à commuter. Vous *devez* créer tout d'abord une source de données avec ce nom";
translations['"ON" text'] = 'Texte correspondant à "ON"';
translations['"OFF" text'] = 'Texte correspondant à "OFF"';
translations["Initial state"] = "Etat initial";
translations["Variable"] = "Variable";
translations["(Optional) Variable to send when the serial port is switched on"] = "(Optionnel) Variable à envoyer quand le port série est ouvert";
translations["Value"] = "Valeur";
translations["Value to send when the variable is defined above"] = "Valeur à envoyer quand la variable est définie ci-dessus";

// extensions/text.widgets.js
translations["Text"] = "Texte";
translations["Title"] = "Titre";
translations["Size"] = "Taille";
translations["Regular"] = "Normale";
translations["Big"] = "Grande";
translations["Small"] = "Petite";
translations["Value"] = "Valeur";
translations["Include Sparkline"] = "Inclure une sparkline";
translations["Animate Value Changes"] = "Animer les changements de valeur";
translations["Units"] = "Unité";

// extensions/textarea.widgets.js
translations["Play"] = "Redémarrer";
translations["Pause"] = "Pause";
translations["Pause and Explore"] = "Pauser et Explorer";
translations["Save to file"] = "Enregistrer";
translations["Save "] = "Enreg.";
translations["Clear"] = "Vider";
translations["Text Area"] = "Zone de texte déroulante";
translations["Title"] = "Titre";
translations["Number of lines to keep"] = "Nombre de lignes à conserver";
translations["Empty for unlimited"] = "Laisser vide si le nombre est limité";
translations["Value"] = "Valeur";
translations["Initially active"] = "Initialement actif";
translations['"No" means that it is initially in "Pause" mode.'] = '"Non" signifie que le composant est initialement dans le mode "Pause"';

// extensions/textdouble.widgets.js
translations["Double Text"] = "Texte double";

// extensions/textinput.widgets.js
translations["Text Input"] = "Entrée textuelle";
translations["A Text Input widget for serial, socket or http communications."] = "Contrôle de type entrée textuelle pour les communications série, http ou socket";
translations['The value really sent will be computed from the textinput value. <br />Use "x" as textinput value'] = "La valeur réellement envoyée sera calculée à partir de la valeur de l'entrée textuelle. <br />Utiliser 'x' comme valeur de cette entrée";

// extensions/websocket.datasources.js
translations["A real-time stream datasource from Websocket servers."] = "Flux de données temps-réel provenant d'un serveur de Websocket.";
translations["Host"] = "Hôte";
translations["Include ws:// or http:// ,..."] = "Inclure ws:// ou http:// ,...";
translations["Refresh rate for sending data. Data will be sent even if control values are not changed"] = "Taux de rafraîchissement pour l'envoi des données. Les données seront envoyées même si la valeur des contrôles auxquelles elles sont connectées sur le tableau de bord est inchangé";
translations["milliseconds"] = "millisecondes";

exports.translations = translations;