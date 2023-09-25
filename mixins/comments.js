export default {
    data() {
        return {
            baseUrl: process.env.APIBASEURI
        }
    },
    methods: {
        async getComments() {
            const result = await this.$axios.$get(
                `${this.baseUrl}/api/v1/comments`,
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
        async getHouseComment(id){
            const result = await this.$axios.$get(`${this.baseUrl}/api/v1/comments/house/${id}`, {
                withCredentials: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })

            if (result.success) {
                return result.data
            }else{
                return false
            }
        },
        async addComment(data){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$post(`${this.baseUrl}/api/v1/comments`, data, {
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

        },
        async editComment(id, data){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$put(`${this.baseUrl}/api/v1/comments/${id}`, data, {
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