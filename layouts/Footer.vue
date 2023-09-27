<template>
    <footer class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-footer-widget">
                        <div class="logo">
                            <nuxt-link to="/"><img src="../assets/img/logo.png" alt="logo"></nuxt-link>
                        </div>
                        <p>Explorez une sélection unique de logement et réservez votre bien insolite de manière simple et rapide !</p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-footer-widget">
                        <h3>Liens rapide</h3>

                        <ul class="quick-links">
                            <li><nuxt-link to="/cart">Panier</nuxt-link></li>
                            <li><nuxt-link to="/checkout">Caisse</nuxt-link></li>
                            <li><nuxt-link to="/products">Les Biens</nuxt-link></li>
                            <li><nuxt-link to="/contact">Contactez-nous</nuxt-link></li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-footer-widget">
                        <h3>Information</h3>

                        <ul class="information-links">
                            <li><nuxt-link to="/login">Connexion</nuxt-link></li>
                            <li><nuxt-link to="/signup">Inscription</nuxt-link></li>
                            <li><nuxt-link to="/politique-de-confidentialite">Politique de confidentialité</nuxt-link></li>
                            <li><nuxt-link to="/mentions-legales">Mentions légales</nuxt-link></li>
                            <li><nuxt-link to="/cgv">CGV</nuxt-link></li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-footer-widget">
                        <h3>Contact</h3>

                        <ul class="footer-contact-info">
                            <li><i class="fas fa-map-marker-alt"></i> Adresse: 10 Rue Napoléon, 60350 Pierrefonds France</li>
                            <li><i class="fas fa-phone"></i> Téléphone: <a href="tel:+33659503087">+33 659503087</a></li>
                            <li><i class="far fa-envelope"></i> Email Us: <a href="mailto:juliusdjossou@gmail.com">juliusdjossou@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="copyright-area">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-6">
                        <p class="centered-text">Copyright &copy; 2022 Atypikhouse. Projet de fin d'année d'étude.</p>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <ul class="payment-card">
                            <li><a href="#" target="_blank"><img src="../assets/img/visa.png" alt="image"></a></li>
                            <li><a href="#" target="_blank"><img src="../assets/img/mastercard.png" alt="image"></a></li>
                            <li><a href="#" target="_blank"><img src="../assets/img/mastercard2.png" alt="image"></a></li>
                            <li><a href="#" target="_blank"><img src="../assets/img/visa2.png" alt="image"></a></li>
                            <li><a href="#" target="_blank"><img src="../assets/img/expresscard.png" alt="image"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* Pour aligner les divs "Liens rapides", "Information" et "Contact" sur la même ligne */


/* Ajustez les styles des colonnes pour qu'elles occupent toute la largeur */
.single-footer-widget {
  flex: 1;
}

/* Ajustez les marges internes pour les éléments de chaque colonne */
.single-footer-widget ul,
.single-footer-widget p {
  margin: 0;
}

/* Appliquer la couleur verte aux titres h3 "Information", "Contact" et "Liens rapides" */
.single-footer-widget h3 {
  color: #8bc34a; /* Couleur verte correspondant au logo */
}

.centered-text {
    text-align: center;
    
}


</style>