from flask import Flask , render_template ,flash , request,redirect , url_for ,session


app = Flask(__name__)

#route pour afficher l index principal 
@app.route('#')
def index(): 
    return render_template('index.html')


#______________________zone pour le forumulaire   inscription connexion patient______________________________


#route pour les patiens 
@app.route('#',methods=['GET' ,'POST'])
def inscription_patient():
    
    if request.method=='post':
        
        # Logique pour traiter l'inscription du patient a ajouter ici
        # Récupérer les données du formulaire  pour l inscription du patient 
        # Créer un nouvel utilisateur dans la base de données cote patient je precise
        
        flash('Inscription réussie! Vous pouvez maintenant vous connecter.', 'success') #message ephemere a remplacer par une page deja cree
        return redirect(url_for('#')) # redirection vers la page d inscriptioin si tout les information n'y sont pas
    return render_template('#') # redirection vers la page d acceuil si tout les information y sont

#_______________________________________connexion_____________


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


@app.route('/patient/dashboard')
def patient_dashboard():
    # Vérifier si le patient est connecté
    if 'patient_id' not in session:
        flash('Veuillez vous connecter pour accéder à votre tableau de bord.', 'warning') # ce message est temporaire et est a remplacer par une page deja cree
        return redirect(url_for('patient_connexion')) # retourne 
    # Récupérer les informations du patient et ses rendez-vous
    return render_template('patient/dashboard.html')

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

@app.route('/rdv/liste')
def liste_rdv():
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Récupérer tous les rendez-vous du patient
    return render_template('rdv/liste.html')

@app.route('/rdv/<int:rdv_id>')
def details_rdv(rdv_id):
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Récupérer les détails du rendez-vous spécifique
    return render_template('rdv/details.html', rdv_id=rdv_id)

@app.route('/rdv/<int:rdv_id>/annuler', methods=['POST'])
def annuler_rdv(rdv_id):
    if 'patient_id' not in session:
        return redirect(url_for('patient_connexion'))
    # Logique pour annuler un rendez-vous
    flash('Rendez-vous annulé avec succès!', 'success')
    return redirect(url_for('liste_rdv'))



# fin zone pour le forumulaire   inscription connexion patient

if "__name__" == (__name__)
app.run(deburg=True)