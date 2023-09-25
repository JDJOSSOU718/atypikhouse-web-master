<template>
    <footer class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="single-footer-widget">
                        <div class="logo">
                            <nuxt-link to="/"><img src="../assets/img/logo.png" alt="logo"></nuxt-link>
                        </div>
                        <p>Louer et Reserver des habitats facilement et rapidement!</p>
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
                        <p>Copyright &copy; 2022 AtipikHouse. Tout droit reservés</p>
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