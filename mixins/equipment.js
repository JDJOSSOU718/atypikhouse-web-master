export default {
    data() {
        return {
            baseUrl: process.env.APIBASEURI
        }
    },
    methods: {
        async getEquipments() {
            const result = await this.$axios.$get(
                `${this.baseUrl}/api/v1/equipment`,
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
        async getEquipment(id){
            const result = await this.$axios.$get(`${this.baseUrl}/api/v1/equipment/${id}`, {
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
        async addEquipment(data){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$post(`${this.baseUrl}/api/v1/equipment`, data, {
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
        async editEquipment(id, data){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$put(`${this.baseUrl}/api/v1/equipment/${id}`, data, {
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

        async deleteEquipment(id){
            const getTokken = this.$store.state.authUser.login_session_token
            const result = await this.$axios.$delete(`${this.baseUrl}/api/v1/equipment/${id}`, {
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