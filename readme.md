# Documentation des Modules - Projet RDV Médical

Cette documentation détaille les modules et bibliothèques utilisés dans le système de gestion de rendez-vous médicaux, expliquant leur rôle et leur utilisation dans le projet cote patient.

## Modules principaux

### 1. Flask

```python
from flask import Flask, render_template, request, redirect, url_for, flash, session
```

**Description**: Flask est un micro-framework web pour Python, utilisé comme base de notre application.

# Composants importés**:

- **Flask**: Classe principale pour créer l'instance de l'application

- **render_template**: Fonction pour générer des pages HTML à partir de templates Jinja2

- **request**: Objet pour accéder aux données des requêtes HTTP (formulaires, paramètres, etc.)

- **redirect**: Fonction pour rediriger l'utilisateur vers une autre URL

- **url_for**: Fonction pour générer des URLs à partir des noms de fonctions de route

- **flash**: Système de messages temporaires pour informer l'utilisateur

- **session**: Dictionnaire pour stocker des données persistantes par utilisateur

**Utilisation dans le projet**:
- Création de l'application web: "app = Flask(__name__)"

- Définition des routes avec décorateurs: `@app.route('/')`

- Rendu des pages HTML: `return render_template('index.html')`

- Traitement des formulaires: `if request.method == 'POST'`

- Redirection après actions: `return redirect(url_for('patient_dashboard'))`

- Messages utilisateur: `flash('Inscription réussie!', 'success')`

- Gestion de l'authentification: `session['patient_id'] = patient_id`

### 2. Flask-SQLAlchemy

```python
from flask_sqlalchemy import SQLAlchemy
```

**Description**: Extension Flask qui ajoute le support de SQLAlchemy, un ORM (Object-Relational Mapper) pour interagir avec la base de données.

**Composants importés**:
- **SQLAlchemy**: Classe principale pour configurer l'ORM

**Utilisation dans le projet**:
- Initialisation: `db =  ` 

- Configuration de la base de données: `app.config['nom de la base de donne_DATABASE_URI'] = 'chemin de recuperation de la base de donne'`

- Création des tables: `db.create_all()`

- Bien que non visible dans les routes, ce module sera utilisé pour définir les modèles de données (Patient, Médecin, Rendez-vous)

### 3. datetime
```python
from datetime import datetime
```

**Description**: Module standard Python pour manipuler les dates et heures.

**Utilisation dans le projet**:
- Gestion des dates de rendez-vous

- Calcul des disponibilités

- Enregistrement pour les datages (création de compte, prise de rendez-vous et autre je sais plus trop)

### 4. os
```python
import os
```

**Description**: Module standard Python pour interagir avec le système d'exploitation.

**Utilisation dans le projet**:

# neanmoins je ne sais pas trop si l'on va l utiliser avec MR ZOKORA
- Génération d'une clé secrète aléatoire pour l'application: `app.secret_key = os.urandom(24)`

- Potentiellement pour la gestion des chemins de fichiers et des variables d'environnement

## Configuration de l'Application

### Configuration de la Base de Données
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/rdv_medical'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

**Description**:
# mysql+pymysql indique l'utilisation du dialecte MySQL (compatible avec MariaDB) avec le pilote PyMySQL

# username:password sont vos identifiants de connexion à la base de données

# localhost est l'adresse du serveur MariaDB
rdv_medical est le nom de votre base de données


### Configuration de la Sécurité

# je ne suis pas trop sur de sont utilisation mais dans mes recherches cela est revenu a plusieurs reprise sur assez de projets

```python
app.secret_key = os.urandom(24)
```

**Description**: Définit une clé secrète pour sécuriser les sessions et les messages flash. Cette clé est générée aléatoirement à chaque démarrage de l'application.

## Fonctionnalités des Modules dans le Contexte du Projet

### Gestion des Sessions
Les sessions Flask permettent de stocker des informations spécifiques à chaque utilisateur entre les requêtes HTTP. Dans notre 

application, elles sont utilisées pour:
- Maintenir l'état de connexion des utilisateurs
- Stocker les identifiants des utilisateurs connectés
- Contrôler l'accès aux pages protégées

### Système de Templates
Flask utilise Jinja2 comme moteur de templates, permettant:
- La séparation de la logique (Python) et de la présentation (HTML)
- La réutilisation de composants d'interface via l'héritage de templates
- L'insertion dynamique de données dans les pages HTML

### ORM pour la Base de Données

# Qu'est-ce qu'un ORM ?
# Un ORM (Object-Relational Mapping ou Mapping Objet-Relationnel en français) est un outil de programmation qui permet de faire le lien entre le monde de la programmation orientée objet et celui des bases de données relationnelles.

# MariaDB dans le Projet RDV Médical
MariaDB permet:

La définition des structures de données via des schémas SQL - Création de tables avec des types de données appropriés, des contraintes et des relations à l'aide de commandes SQL DDL (Data Definition Language)

La création et la migration des schémas de base de données - Utilisation de scripts SQL pour créer, modifier et mettre à jour la structure de la base de données au fil du temps

L'exécution de requêtes complexes avec SQL natif - Écriture de requêtes SQL optimisées pour récupérer, filtrer et manipuler les données avec des jointures, sous-requêtes et fonctions d'agrégation

La gestion des relations entre les différentes entités (Patient, Médecin, Rendez-vous) - Utilisation de clés étrangères, contraintes d'intégrité référentielle et index pour maintenir les relations entre les tables et garantir la cohérence des données

### Système de Messages Flash

# NB : dans notre projet les  messages ont deja ete cree sous forme de page donc flash a ete ajouter pour juste l illustration et la maintenance de celui qui va travailler sur les parties 

Le système de messages flash de Flask permet:
- D'informer l'utilisateur du résultat de ses actions
- D'afficher des messages de confirmation, d'erreur ou d'information
- De transmettre des messages entre les redirections

## Modèles de Données (à implémenter)
Bien que non définis dans le code fourni, les modèles suivants devront être implémentés avec maria db: dison que c est notre a priorie base de donnee

# Lorsque vous utilisez SQLAlchemy avec MariaDB, la classe ""db.Model"" sert toujours de classe de base pour vos modèles, mais SQLAlchemy génère des instructions SQL spécifiques à MariaDB lors de la création des tables et de l'exécution des requêtes. Cela vous permet de profiter des fonctionnalités particulières de MariaDB (comme ses types de données, ses contraintes et ses optimisations) tout en gardant la simplicité de la programmation orientée objet.

### Patient

```python
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    mot_de_passe = db.Column(db.String(100), nullable=False)
    date_naissance = db.Column(db.Date, nullable=False)
    telephone = db.Column(db.String(20), nullable=False)
    rendez_vous = db.relationship('RendezVous', backref='patient', lazy=True)
```
# backref='patient' 
crée automatiquement un attribut "patient" sur les objets RendezVous, permettant d'accéder au patient associé à un rendez-vous (relation inverse).

# lazy=True
 définit le mode de chargement des données associées, indiquant que les rendez-vous ne seront chargés depuis la base de données que lorsqu'on accède spécifiquement à cet attribut (chargement différé), ce qui optimise les performances.

### RendezVous

```python
class RendezVous(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_heure = db.Column(db.DateTime, NOTNULL=False)
    motif = db.Column(db.String(200), NOTNULL=False)
    statut = db.Column(db.String(20), default='Programmé')
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), NOTNULL=False)
    medecin_id = db.Column(db.Integer, db.ForeignKey('medecin.id'), NOTNULL=False)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)
```
# db.DateTime
 définit une colonne de type date et heure dans la base de données, stockant à la fois la date et l'heure avec précision.

# default=datetime.utcnow 
spécifie que si aucune valeur n'est fournie lors de la création d'un enregistrement, la date et l'heure UTC actuelles seront automatiquement utilisées comme valeur par défaut.
## Initialisation de l'Application

```python
if __name__ == "__main__":
    # Créer les tables de la base de données avant de lancer l'application
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```
# debug=True 
active le mode de débogage dans Flask, ce qui permet d'afficher automatiquement les erreurs détaillées dans le navigateur, d'activer le rechargement automatique du serveur lorsque le code est modifié, et d'accéder à une console interactive en cas d'erreur. Ce mode est utile pendant le développement mais ne doit jamais être utilisé en production pour des raisons de sécurité.

**Description**:
- Vérifie si le script est exécuté directement (et non importé)
- Crée les tables de la base de données si elles n'existent pas
- Lance le serveur de développement avec le mode debug activé

###### Cette documentation des modules fournit une vue d'ensemble des technologies utilisées dans le projet de gestion de rendez-vous médicaux, expliquant comment elles interagissent pour créer une application web fonctionnelle .#########

# _________________________________________________________________________________________________________________________
# _________________________________________________________________________________________________________________________
# _________________________________________________________________________________________________________________________
# _________________________________________________________________________________________________________________________
# _________________________________________________________________________________________________________________________


# Documentation des Routes - Projet RDV Médical

Cette documentation détaille les routes principales du système de gestion de rendez-vous médicaux, en se concentrant sur les fonctionnalités pour les patients et la gestion des rendez-vous.

## 1. Route Principale

### Page d'accueil
- **URL**: `/`
- **Méthode**: GET
- **Description**: Affiche la page d'accueil du site permettant aux utilisateurs de naviguer vers les différentes fonctionnalités.
- **Implémentation**:
  ```python
  @app.route('/')
  def index():
      return render_template('index.html')
  ```

## 2. Routes pour les Patients

### Inscription Patient
- **URL**: `/patient/inscription`
- **Méthodes**: GET, POST
- **Description**: 
  - GET: Affiche le formulaire d'inscription pour les nouveaux patients
  - POST: Traite les données du formulaire pour créer un nouveau compte patient
- **Implémentation**:
  ```python
  @app.route('/patient/inscription', methods=['GET', 'POST'])
  def patient_inscription():
      if request.method == 'POST':
          # Traitement des données du formulaire
          # Création du compte patient
          flash('Inscription réussie! Vous pouvez maintenant vous connecter.', 'success')
          return redirect(url_for('patient_connexion'))
      return render_template('patient/inscription.html')
  ```

### Connexion Patient
- **URL**: `/patient/connexion`
- **Méthodes**: GET, POST
- **Description**: 
  - GET: Affiche le formulaire de connexion
  - POST: Authentifie le patient et crée une session
- **Implémentation**:
  ```python
  @app.route('/patient/connexion', methods=['GET', 'POST'])
  def patient_connexion():
      if request.method == 'POST':
          # Vérification des identifiants
          # Création de la session
          session['patient_id'] = patient_id
          flash('Connexion réussie!', 'success')
          return redirect(url_for('patient_dashboard'))
      return render_template('patient/connexion.html')
  ```

### Déconnexion Patient
- **URL**: `/patient/deconnexion`
- **Méthode**: GET
- **Description**: Déconnecte le patient en supprimant sa session
- **Implémentation**:
  ```python
  @app.route('/patient/deconnexion')
  def patient_deconnexion():
      session.pop('patient_id', None)
      flash('Vous avez été déconnecté.', 'info')
      return redirect(url_for('index'))
  ```

### Tableau de Bord Patient
- **URL**: `/patient/dashboard`
- **Méthode**: GET
- **Description**: Affiche le tableau de bord du patient avec ses informations et ses rendez-vous à venir
- **Sécurité**: Nécessite une session patient active
- **Implémentation**:
  ```python
  @app.route('/patient/dashboard')
  def patient_dashboard():
      if 'patient_id' not in session:
          flash('Veuillez vous connecter pour accéder à votre tableau de bord.', 'warning')
          return redirect(url_for('patient_connexion'))
      # Récupération des données du patient et de ses rendez-vous
      return render_template('patient/dashboard.html')
  ```

### Profil Patient
- **URL**: `/patient/profil`
- **Méthodes**: GET, POST
- **Description**: 
  - GET: Affiche les informations du profil du patient
  - POST: Met à jour les informations du profil
- **Sécurité**: Nécessite une session patient active
- **Implémentation**:
  ```python
  @app.route('/patient/profil', methods=['GET', 'POST'])
  def patient_profil():
      if 'patient_id' not in session:
          return redirect(url_for('patient_connexion'))
      if request.method == 'POST':
          # Mise à jour des informations du profil
          flash('Profil mis à jour avec succès!', 'success')
      return render_template('patient/profil.html')
  ```

## 3. Routes pour les Rendez-vous

### Prise de Rendez-vous
- **URL**: `/rdv/nouveau`
- **Méthodes**: GET, POST
- **Description**: 
  - GET: Affiche le formulaire de prise de rendez-vous avec les médecins disponibles
  - POST: Enregistre le nouveau rendez-vous
- **Sécurité**: Nécessite une session patient active
- **Implémentation**:
  ```python
  @app.route('/rdv/nouveau', methods=['GET', 'POST'])
  def nouveau_rdv():
      if 'patient_id' not in session:
          return redirect(url_for('patient_connexion'))
      if request.method == 'POST':
          # Création du rendez-vous
          flash('Rendez-vous pris avec succès!', 'success')
          return redirect(url_for('patient_dashboard'))
      # Récupération de la liste des médecins disponibles
      return render_template('rdv/nouveau.html')
  ```

### Liste des Rendez-vous
- **URL**: `/rdv/liste`
- **Méthode**: GET
- **Description**: Affiche la liste de tous les rendez-vous du patient (passés et à venir)
- **Sécurité**: Nécessite une session patient active
- **Implémentation**:
  ```python
  @app.route('/rdv/liste')
  def liste_rdv():
      if 'patient_id' not in session:
          return redirect(url_for('patient_connexion'))
      # Récupération des rendez-vous du patient
      return render_template('rdv/liste.html')
  ```

### Détails d'un Rendez-vous
- **URL**: `/rdv/<int:rdv_id>`
- **Méthode**: GET
- **Description**: Affiche les détails d'un rendez-vous spécifique
- **Paramètres**: `rdv_id` - Identifiant unique du rendez-vous
- **Sécurité**: Nécessite une session patient active et vérification que le rendez-vous appartient au patient
- **Implémentation**:
  ```python
  @app.route('/rdv/<int:rdv_id>')
  def details_rdv(rdv_id):
      if 'patient_id' not in session:
          return redirect(url_for('patient_connexion'))
      # Récupération des détails du rendez-vous
      return render_template('rdv/details.html', rdv_id=rdv_id)
  ```

### Annulation d'un Rendez-vous
- **URL**: `/rdv/<int:rdv_id>/annuler`
- **Méthode**: POST
- **Description**: Permet au patient d'annuler un rendez-vous programmé
- **Paramètres**: `rdv_id` - Identifiant unique du rendez-vous
- **Sécurité**: Nécessite une session patient active et vérification que le rendez-vous appartient au patient
- **Implémentation**:
  ```python
  @app.route('/rdv/<int:rdv_id>/annuler', methods=['POST'])
  def annuler_rdv(rdv_id):
      if 'patient_id' not in session:
          return redirect(url_for('patient_connexion'))
      # Logique d'annulation du rendez-vous
      flash('Rendez-vous annulé avec succès!', 'success')
      return redirect(url_for('liste_rdv'))
  ```

## Sécurité et Bonnes Pratiques

1. **Protection des routes** : Toutes les routes nécessitant une authentification vérifient la présence d'un ID patient dans la session.

2. **Messages Flash** : Utilisation de messages flash pour informer l'utilisateur du résultat de ses actions.

3. **Redirections** : Après chaque action POST réussie, l'utilisateur est redirigé vers une page appropriée (pattern POST/Redirect/GET).

4. **Vérification des permissions** : Pour les routes de rendez-vous, il faudra implémenter une vérification que le patient accède uniquement à ses propres rendez-vous.

## Flux d'Utilisation Typique : les pages devrons etre remodeler pour suivre ce schema  donc ce que  tu fera tu va telecharger l enssemble des elements de mon module et tester les changements sur votre prope depot github @aliou et @divine pour avoir ce schema 

1. Le patient s'inscrit via `/patient/inscription`
2. Le patient se connecte via `/patient/connexion`
3. Le patient accède à son tableau de bord via `/patient/dashboard`
4. Le patient prend un rendez-vous via `/rdv/nouveau`
5. Le patient consulte ses rendez-vous via `/rdv/liste`
6. Le patient peut voir les détails d'un rendez-vous via `/rdv/<id>`
7. Le patient peut annuler un rendez-vous via `/rdv/<id>/annuler`
8. Le patient peut modifier son profil via `/patient/profil`
9. Le patient se déconnecte via `/patient/deconnexion`

# Cette documentation couvre les principales fonctionnalités du système de gestion de rendez-vous médicaux pour les patients. Elle servira de référence pour l'implémentation et la maintenance du système.


# _________________________________________________________________________________________________________________________