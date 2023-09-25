export default {
    data() {
        return {
            baseUrl: process.env.APIBASEURI
        }
    },
    methods: {
        async addBooking(data){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$post(`${this.baseUrl}/api/v1/booking`, data, {
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

        async getBookings(){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$get(`${this.baseUrl}/api/v1/booking`, {
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

        async getOwnerBookings(){
            const getTokken = this.$store.state.authUser.login_session_token
            const userID = this.$store.state.authUser.id
            const result = await this.$axios.$get(`${this.baseUrl}/api/v1/booking/owner/${userID}`, {
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
        async getUserBookings(){
            const getTokken = this.$store.state.authUser.login_session_token
            const userID = this.$store.state.authUser.id
            const result = await this.$axios.$get(`${this.baseUrl}/api/v1/booking/author/${userID}`, {
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

        async updateStatus(id, status){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$put(`${this.baseUrl}/api/v1/booking/status/${id}`, {status}, {
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
        async delete(id){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$delete(`${this.baseUrl}/api/v1/booking/${id}`, {
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
    }
}