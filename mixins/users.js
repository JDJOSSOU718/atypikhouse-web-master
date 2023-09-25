export default {
    data() {
        return {
            baseUrl: process.env.APIBASEURI
        }
    },
    methods: {
        async sendmail(to, subject, body, from = 'Atipikhouse') {
            return await this.$axios.$post(this.baseUrl + '/api/v1/mail/', {
                from,
                to,
                subject,
                body
            })
        },
        async add(user, Mailler = false) {
            let result = await this.$axios
                .$post(this.baseUrl + '/api/v1/users/', user)
                .catch(error => {
                    if (error) {
                        return {
                            success: false,
                            message:
                                'Une erreur est survenue lors de la creation de votre compte veuillez réessayer ultérieurement.'
                        }
                    }
                })
            if (!result.success) return result
            if (Mailler) {
                const userdata = await this.$axios.$get(
                    this.baseUrl + '/api/v1/users/' + result.data
                )
                if (!userdata.success)
                    return {
                        success: false,
                        message:
                            'Une erreur est survenue lors de la creation de votre compte veuillez réessayer ultérieurement.'
                    }
                const mail = await this.$axios.$post(this.baseUrl + '/api/v1/mail/', {
                    from: 'Atipikhouse',
                    to: userdata.data.email,
                    subject: 'Confirmation de compte',
                    body: `veuillez confirmer votre compte via le lien suivant: ${window.location.protocol}//${window.location.host}/confirmation/${userdata.data.confirmation_token}`,
                })

                if (mail.success) {
                    return {
                        success: true,
                        message:
                            'Compte créer avec succès! Consultez votre mail pour confirmer votre compte.'
                    }
                } else {
                    return {
                        success: false,
                        message:
                            'Une erreur est survenue lors de la creation de votre compte veuillez réessayer ultérieurement.'
                    }
                }
            } else {
                return { success: true, message: 'Compte créer avec succès!' }
            }
        },

        async edit(user, user_id) {
            let getTokken = this.$store.state.authUser.login_session_token
            return await this.$axios.$put(
                `${this.baseUrl}/api/v1/users/${user_id}`,
                user,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: getTokken
                    }
                }
            )
        },

        async deleteUser(id) {
            let getTokken = this.$store.state.authUser.login_session_token
            return await this.$axios.$delete(
                `${this.baseUrl}/api/v1/users/${id}`,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: getTokken
                    }
                }
            )
        },

        async login(email, password) {
            return await this.$axios.$post(this.baseUrl + '/api/v1/login/', {
                email,
                password
            })
        },

        async getUserHouse() {
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$get(
                `${this.baseUrl}/api/v1/houses/author/${this.$store.state.authUser.id}`,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: getTokken
                    }
                }
            )
            if (result.success) {
                return result.data
            } else {
                return false
            }
        },

        async updateUserPass(token, id, password) {
            return await this.$axios.$put(
                `${this.baseUrl}/api/v1/users/pass/${id}`,
                { password },
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: token
                    }
                }
            )
        },

        async getUserByEmail(email) {
            return await this.$axios.$post(
                `${this.baseUrl}/api/v1/users/pass/`,
                { email },
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
        },

        async getUsers () {
            const getTokken = this.$store.state.authUser.login_session_token
            return await this.$axios.$get(
                `${this.baseUrl}/api/v1/users/`,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: getTokken
                    }
                }
            )

        }
    }
}
