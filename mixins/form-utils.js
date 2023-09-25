export default {
    methods: {
        validateEmail(email) {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return false
            } else {
                return true
            }
        },
        validatePassword(password) {
            if (password.length < 8) {
                return false;
            }
        
            // Vérifier la présence de chiffres
            if (!/\d/.test(password)) {
                return false;
            }
        
            // Vérifier la présence de lettres minuscules
            if (!/[a-z]/.test(password)) {
                return false;
            }
        
            // Vérifier la présence de lettres majuscules
            if (!/[A-Z]/.test(password)) {
                return false;
            }
        
            // Vérifier la présence de caractères spéciaux
            if (!/[!@#$%^&*]/.test(password)) {
                return false;
            }

            return true
        },
        validatePhone(phone) {
            if (phone == '') {
                return false
            } else if (/\d/.test(phone) === false) {
                return false
            }

            if (phone.length > 14 || phone.length < 6) {
                return false
            }
            return true
        },
        validateRequiredField(field) {
            if (field == null || field == '') {
                return false
            } else {
                return true
            }
        },
        validateConfirmPass(pass, cPass) {
            if (pass === cPass) {
                return true
            } else {
                return false
            }
        },
        scrollToTop() {
            window.scrollTo(25, 25)
        },

        checkFileExt(file, ext = ['jpg', 'png']) {
            if (!Array.isArray(ext)) {
                return false
            }

            let parseExt = ext.toString().replaceAll(',', '|')
            var re = new RegExp(`(.*?).(${parseExt})$`)
            if (!file.length) {
                if (!re.test(file.name)) {
                    return false
                }
                return true
            } else {
                for (let index = 0; index < file.length; index++) {
                    if (!re.test(file[index].name)) {
                        return false
                    }
                }
                return true
            }
        },

        getFileExt(filename) {
            return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : false
        },

        keepFilesArrays(fileList) {
            let namesArrays = []
            for (let index = 0; index < fileList.length; index++) {
                namesArrays.push(fileList[index].name)
            }
            return namesArrays
        },

        validatePrice(price) {
            var re = /^\d+(?:[.,]\d+)*$/gm
            if (parseFloat(price) == NaN) return false
            if (re.test(price) == false) {
                return false
            } else {
                return true
            }
        },

        uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                        (15 >> (c / 4)))
                ).toString(16)
            )
        },
        validateUuid(uuid) {
            let r = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            if (!r.test(uuid)) {
                return false
            } else {
                return true
            }
        },
        getDatesInRange(startDate, endDate) {
            const date = new Date(startDate.getTime())
            const endDates = new Date(endDate.getTime())
            const dates = []
            self = this
            while (date <= endDates) {
                dates.push(self.$moment(date).unix())
                date.setDate(date.getDate() + 1)
            }
            return dates
        },
        getOffDayObject(timeStamp) {
            return {
                start: new Date(timeStamp * 1000),
                end: new Date(timeStamp * 1000)
            }
        },
        getCalendarOffDays($timestampOffDays = []) {
            let $return = [],
                self = this
            if (Array.isArray($timestampOffDays)) {
                $timestampOffDays.forEach(el => {
                    $return.push(self.getOffDayObject(el))
                })
            }
            return $return
        },

        async validateCaptcha(){
            try {
                const token = await this.$recaptcha.getResponse()
                const verifiedStatus = await this.$axios.$get(`https://www.google.com/recaptcha/api/siteverify`, {
                    params: {
                        secret: process.env.RECPATCHA_SK,
                        response: token
                    },
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })

                if (verifiedStatus.success){
                    await this.$recaptcha.reset()
                    return true
                }else{
                    await this.$recaptcha.reset()
                    return false
                    
                }
                
            } catch (error) {
                if (process.env.ENV == 'production'){
                    return false
                }else{
                    return true
                }
            }
        }
    }
}
