from flask import Flask , render_template , request,redirect ,flash , url_for ,session , datetime


app = Flask(__name__)

#route pour afficher l index principal 
@app.route('/')
def index(): 
    return render_template('index.html')


#______________________zone pour le forumulaire   inscription connexion patient______________________________


#route pour les patiens 
@app.route('#',methods=['GET' ,'POST'])
def inscription_patient():
    if request.method== 'POST':
        
        #recuperation des informations du formulaire
        nom = request.form.get('nom')
        prenom = request.form.get('prenom')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        telephone = request.form.get('telephone')
        date_naissance = request.form.get('date_naissance')
        adresse = request.form.get('adresse')

        # Validation des données
        if not nom or not prenom or not email or not password:
            return redirect(url_for('inscription_patient'))
            
        if password != confirm_password:
            flash('Les mots de passe ne correspondent pas.')
            return redirect(url_for('inscription_patient'))
            
        # Vérifier si l'email existe déjà
        patient_existant = Patient.query.filter_by(email=email).first()
        if patient_existant:
            flash('Cet email est déjà utilisé. Veuillez en choisir un autre.', 'danger')
            return redirect(url_for('inscription_patient'))
            
        # Créer un nouvel utilisateur ?      
    return render_template('patient/inscription.html')
        
        

#_______________________________________connexion___________________________________________


@app.route('#', methods=['GET', 'POST'])
def patient_connexion():
    if request.method == 'POST':
        
        # Logique pour vérifier les identifiants
        
        # Si valide, stocker l'ID du patient dans la session
        

        flash('Connexion réussie!', 'success')
        return redirect(url_for('patient_dashboard')) #si la connexion reussi l utilisateur est rediriger ver la page d acceuil
    return render_template('#') # si la connexion na pas reussie la page de connexion lui est retourner

#_______________________________________ fin-connexion_____________


#_______________________________________deconnexion_____________

@app.route('#') # route pour la deconnexion du patient 
def patient_deconnexion():
    session.pop('patient_id', None) #suppression du patient en fonction de son id dans la base de donnee
    flash('Vous avez été déconnecté.', 'info') # message de deconnexion, cela sera 
    return redirect(url_for('index'))
#_______________________________________fin-deconnexion_____________


@app.route('./templates/acceuil')
def patient_dashboard():
    # Vérifier si le patient est connecté
    if 'patient_id' not in session: 
        return render_template('#')
        flash('Veuillez vous connecter pour accéder à votre tableau de bord.', 'warning') # ce message est temporaire et est a remplacer par une page deja cree
        return redirect(url_for('patient_connexion')) # retourne 
    # Récupérer les informations du patient et ses rendez-vous
    return render_template('patient/dashboard.html')

# fin zone pour le forumulaire   inscription connexion patient

# ________________________profil patient __________________________
@app.route('/patient/profil', methods=['GET', 'POST'])
def patient_profil():
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    if request.method == 'POST':
        # Mettre à jour le profil du patient
        flash('Profil mis à jour avec succès!', 'success')
    return render_template('patient/profil.html')


#_____________________________section pour les rendez-vous________________

# Routes pour les rendez-vous
@app.route('/rdv/nouveau', methods=['GET', 'POST'])
def nouveau_rdv():
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    if request.method == 'POST':
        # Logique pour créer un nouveau rendez-vous
        flash('Rendez-vous pris avec succès!', 'success')
        return redirect(url_for('patient_dashboard'))
    # Récupérer la liste des médecins disponibles
    return render_template('rdv/nouveau.html')


# route pour la liste des rendez -vous
@app.route('/rdv/liste')
def liste_rdv():
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Récupérer tous les rendez-vous du patient
    return render_template('rdv/liste.html')


# route pour voir les details des rendez-vous  (mes rendez-vous dans notre code)
@app.route('/rdv/<int:rdv_id>')
def details_rdv(rdv_id):
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Récupérer les détails du rendez-vous spécifique
    return render_template('rdv/details.html', rdv_id=rdv_id)


#route pour l'annulation de prise de rendez-vous
@app.route('/rdv/<int:rdv_id>/annuler', methods=['POST'])
def annuler_rdv(rdv_id):
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Logique pour annuler un rendez-vous
    flash('Rendez-vous annulé avec succès!', 'success')
    return redirect(url_for('liste_rdv'))


# route pour la reprogrammation de reservation
@app.route('', methods=[''])
def reprogrammation():
    return render_template('')


#route pour la selection des specialites 
@app.route('', methods=[''])
def selection_specialite():
    return render_template('')

#route pour la selection des categories
@app.route('', methods=[''])
def selection_categories():
    return render_template('')



if "__name__" == (__name__):
    app.run(deburg=True)