export default {
    data() {
        return {
            baseUrl: process.env.APIBASEURI
        }
    },
    methods: {
        async getHouses() {
            const result = await this.$axios.$get(
                `${this.baseUrl}/api/v1/houses`,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            if (result.success) {
                return result.data
            }
            return false
        },
        async deleteHouse(id){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$delete(`${this.baseUrl}/api/v1/houses/${id}`, {
                withCredentials: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    authorization: getTokken
                }
            })

            if (result.success) {
                return result.data
            }else{
                return false
            }

        }
    }
}
