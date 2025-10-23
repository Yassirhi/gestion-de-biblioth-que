const prompt = require ("prompt-sync")();

let livres = []; 

let abonnes = [];
let emprunts = []; 

function AjouterLivre() {
    idlivre=prompt("Entrer l'ID de livre : ")
    titrel=prompt("Entrer le titre de livre : ")
    auteurl=prompt("Entrer l'Auteur de livre : ")
    annee_de_publication=prompt("Entrer l'Année de publication :")
    
    const livre = { id_livre: idlivre, titre: titrel, auteur: auteurl, annee: annee_de_publication, disponible: true }
   
    livres.push(livre)
    console.log("Livre ajouté avec succès ");

}

function AfficherLivres(livres) {
    console.log("========== Liste Des Livres ==========")
    for (let i = 0; i < livres.length; i++) {
        console.log(`
            id : ${livres[i].id_livre}
            titre : ${livres[i].titre}
            auteur :${livres[i].auteur}
            annee : ${livres[i].annee}
            disponible :${livres[i].disponible }`)
    }
    tst();
}

function TrierParNom(livres) {
   let o=prompt("Voulez-vous trier les livres ascendant?(oui/non) : ")
    if (o==="oui") {
        livres.sort((a, b) => b.titre.localeCompare(a.titre));
        console.log(livres);
    } else if (o==="non"){
       let i=prompt("Voulez-vous trier les livres descendant ?(oui/non) :")
        if (i==="oui") {
            livres.sort((a, b) => a.titre.localeCompare(b.titre));
            console.log(livres);
        }
        
    }
    tst();
}
function TrierParAnneeDePublication(livres) {
        livres.sort((a, b) => a.annee.localeCompare(b.annee));
        console.log(livres);
        tst();
}

function AfficherDispo(livres) {
    let exist=false;
    console.log("========== Livres disponibles ==========")
    for (let i = 0; i < livres.length; i++) {
        if(livres[i].disponible==true){
            console.log(livres[i]);
            exist=true
        }
    }
    if (exist == false) {
        console.log("   Pas de livre disponible")
    }
    
}

function RechercheLivre(livres,id) {
    for (let i = 0; i < livres.length; i++) {
        if (livres[i].id_livre== id) {
            console.log(livres[i])
        }
    }
    tst();
}

function AjouterAbonne() {
    id=prompt("Entrer l'ID de l'abonné :")
    nom=prompt("Entrer le nom :")
    prenom=prompt("Entrer le prénom : ")
    email=prompt("Entrer l'E-mail : ")
    const abonne = {id,nom,prenom,email}
    abonnes.push(abonne)
    console.log("Abonné ajouté avec succès ")
    tst();
}

function AfficherAbonnes() {
    console.log("=========== Liste Des Abonnés ===========")
    if(abonnes.length != 0){
        for (let i = 0; i < abonnes.length; i++) {
            console.log(abonnes[i])
        }
    }else {console.log("   Pas d'abonné ")}
    tst();
}
function emprunter(livres,abonnes) {
    let exist=false;
    let abo=false;
    let enter =0;
    let n=prompt("Entrer votre nom : ")
    for (let i = 0; i < abonnes.length; i++) {
        if(abonnes[i].nom===n){
            let l=prompt("Entrer le titre de livre à emprunter :")
            abo=true;
            for (let j = 0; j < livres.length; j++) {
                enter=1
                if (livres[j].titre===l) {
                    if (livres[j].disponible==true) {
                        livres[j].disponible=false;
                        console.log("Le livre a été emprunté avec succès");
                        let id =abonnes[i].id
                        let idLivre=livres[j].id_livre
                        const date = new Date();
                        const emprunt = { abonneId: id, id_livre: idLivre, dateEmprunt: date}
                        emprunts.push(emprunt)
                        exist=true;
                    }
                     

                    }
            }
        }
    }
    if(abo==false){console.log("======================================");
        console.log("Vous n'êtes pas abonné")}
    if (enter === 1 && exist==false) {console.log("Le livre n'existe pas !")}
}

function retour(livres,emprunts,titre) {
    let exist=false
    for (let i = 0; i < livres.length; i++) {
        if (livres[i].titre==titre) {
            livres[i].disponible=true;
            for (let j = 0; j < emprunts.length; j++) {
                if(livres[i].id_livre==emprunts[j].id_livre){
                  emprunts.splice(i, 1);
                     exist=true;
                     console.log("Le livre est bien retourné ")
                }
        }   
    }
}
  if (exist==false) {console.log("Le livre est introuvable !")}
    tst();
}

function AfficherEmpr(emprunts,abonnes,v) {
    for (let j = 0; j < abonnes.length; j++) {
        if(abonnes[j].nom==v){
            for (let i = 0; i < emprunts.length; i++) {
                if (abonnes[j].id==emprunts[i].abonneId) {
                    console.log(emprunts[i]);
                }       
            }
        }
    }
    tst();
}

function tst() {
console.log("========= Bibliothèque =========");
console.log("1. Gérer Les livres")
console.log("2. Gérer les abonnés")
console.log("3. Gérer les emprunts")
console.log("4.Quitter")
console.log("================================")
d=prompt("Entrer votre choix : ")
switch (d) {
    case "1":
        console.log("================ Gestion Des Livres ================ ")
        console.log("1 : Ajouter un livre ")
        console.log("2 : Afficher tous livres ")
        console.log("3 : Trier les livres par titre ")
        console.log("4 : Trier les livres par année de publication  ")
        console.log("5 : Afficher uniquement les livres disponibles")
        console.log("6 : Rechercher un livre  ")        
        console.log("7 : Ajouter plusieurs livre")
        console.log("====================================================")
        let a=prompt("Entrer votre choix : ")
        switch (a) {
            case "1":
                    AjouterLivre();
                        tst();
                break;
            case "2":
                    AfficherLivres(livres);
                break;
            case "3":
                    TrierParNom(livres)
                break;
            case "4":
                    TrierParAnneeDePublication(livres)
                break;
            case "5":
                    AfficherDispo(livres)
                    tst();
                break;
            case "6":
                    id=prompt("Entrer l'ID de livre à chercher : ")
                    RechercheLivre(livres,id)
                break;
            case "7":
                    let c=+prompt("Combien de livres voulez-vous ajouter : ")
                    if(isNaN(c)){console.log("Entrer une valeur valide !")}
                    else{
                        for (let i = 0; i < c; i++) {
                            AjouterLivre()
                        }
                    }
                    tst();
                break;

            default:
                console.log("************************************")
                console.log("Entrer un choix valide !")
                console.log("************************************")
                tst();
                break;
        }
        break;
    case "2":
             console.log("================ Gestion Des Abonnés ================ ")
             console.log("1 : Ajouter un abonné  ")
             console.log("2 : Afficher tous les abonnés ")
             console.log("=====================================================")
             let z =prompt("Entrer Votre Choix : ")
             switch (z) {
                case "1":
                    AjouterAbonne()
                    break;
                case "2":
                    AfficherAbonnes()
                    break;
             
                default:
                    console.log("******************************")
                    console.log("Entrer choix valide ")
                    console.log("******************************")
                    tst();
                    break;
             }

        break;

    case "3":
             console.log("================ Gestion Des emprunts  ================ ")
             console.log("1 : Enregistrer un emprunt  ")
             console.log("2 : Enregistrer un retour ")
             console.log("3 : Afficher les livres empruntés par un abonné")
             console.log("======================================================= ")
             let e =prompt("Entrer Votre Choix : ")
             switch (e) {
                case "1":
                    AfficherDispo(livres)
                    emprunter(livres,abonnes)
                    tst();
                    break;
                case "2":
                    l=prompt("Entrer le titre de livre que vous voulez retourner : ")
                    retour(livres,l)
                    break;
                case "3":
                    v=prompt("Entrer le nom de l'abonné(e) :")
                    AfficherEmpr(emprunts,abonnes,v)
                    break;                    
             
                default:
                    break;
             }

        break;

    case "4":
        break;

    default:
        console.log("*****************************")
        console.log("Entrer un choix valide")
        console.log("*****************************")
        tst();
        break;
}
}
tst();