<script setup>
    import { ref, reactive } from 'vue'
    import { useUsersStore } from '../stores/users.js'
    import { login, register } from "../services/auth"

    let usersStore = useUsersStore()
    let dialog = ref(false)
    let showPassword = ref(false)
    let loginData = reactive({password: "", email: ""})
    let registerData = reactive({name: "", password: "", email: "", password_confirmation: ""})
    let step = ref('login')
    let validationErrors = reactive({
        "login":{
            "email": [],
            "password":[]
        },
        "register":{
            "email": [],
            "password":[],
            "password_confirmation":[],
            "name": []
        }
    })

    async function attemptLogin(){
        Object.assign(validationErrors.login, {
            "email": [],
            "password":[]
        })
        let result = login(loginData, usersStore)
        if (result.message === "validation error") {
            setFormErrors(result, "login")
        }

        dialog.value = false
    }

    async function attemptRegister(){
        Object.assign(validationErrors.register, {
            "email": [],
            "password":[],
            "password_confirmation":[],
            "name": []
        })

        let result = register(registerData)
        
        if (result.message === "validation error") {
            setFormErrors(result, "register")
        }
        
        if (result.success) {
            loginData.email = registerData.email
            loginData.password = registerData.password
            step.value = "login"
        }
    }

    function setFormErrors(result, parentForm){
        for (const key in result.errors) {
            if (Object.hasOwnProperty.call(result.errors, key)) {
                const errors = result.errors[key];
                Object.assign(validationErrors[parentForm][key], errors)
            }
        }
    }
</script>

<template>
    <v-row justify="center">
        <v-dialog v-model="dialog">
            <template v-slot:activator="{props}">
                <v-btn @click="dialog = !dialog" icon>
                    <v-icon size="small" icon="far fa-user"></v-icon>
                </v-btn>
            </template>
            
            <v-card :max-width="750" :width="750">
                <v-card-title class="text-center">
                    <span class="text-h4">{{step === 'login' ? 'Log in' : 'Register'}}</span>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="dialog = false"
                        class="position-absolute"
                        style="right:0"
                    >
                        X
                    </v-btn>
                </v-card-title>
                <v-window v-model="step">
                    <v-card-text>
                        <v-window-item :value="'login'">
                            <v-form
                            @submit.prevent
                            lazy-validation
                            >
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        hide-details="auto"
                                        autocomplete="off"
                                        v-model="loginData.email"
                                        variant="solo"
                                        label="Email"
                                        :error-messages="validationErrors.login.email"
                                        type="email"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        hide-details="auto"
                                        v-model="loginData.password"
                                        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="showPassword ? 'text' : 'password'"
                                        :error-messages="validationErrors.login.password"
                                        counter
                                        variant="solo" 
                                        label="Password"
                                        @click:append="showPassword = !showPassword"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-window-item>
                        <v-window-item :value="'register'">
                            <v-form
                            @submit.prevent
                            lazy-validation
                            >
                                <v-row>
                                    <v-col cols="12">
                                        <small>Registration is limited and handed out on an individual basis. If you are unable to complete registration please contact Christina directly</small>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="registerData.email"
                                        hide-details="auto"
                                        variant="solo"
                                        :error-messages="validationErrors.register.email"
                                        label="Email"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="registerData.name"
                                        variant="solo"
                                        hide-details="auto"
                                        :error-messages="validationErrors.register.name"
                                        label="Name"
                                        required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="registerData.password"
                                        hide-details="auto"
                                        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="showPassword ? 'text' : 'password'"
                                        hint="Minimum of 8 characters, 1 Uppercase, 1 lowercase, 1 number"
                                        counter
                                        variant="solo" 
                                        label="Password"
                                        persistent-hint
                                        :error-messages="validationErrors.register.password"
                                        required
                                        @click:append="showPassword = !showPassword"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                        v-model="registerData.password_confirmation"
                                        :error-messages="validationErrors.register.password_confirmation"
                                        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="showPassword ? 'text' : 'password'"
                                        counter
                                        variant="solo" 
                                        label="Confirm Password" 
                                        required
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-window-item>
                    </v-card-text>
                </v-window>
                
                <v-card-actions class="flex justify-space-between">
                    <template v-if="step === 'login'">
                        <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="attemptLogin"
                        >
                            Login
                        </v-btn>
                        <div>
                            Need an account? <VBtn variant="text" @click="step = 'register'">Register</VBtn>
                        </div>
                    </template>
                    <template v-if="step === 'register'">
                        <v-btn
                            color="primary"
                            variant="text"
                            @click="attemptRegister"
                        >
                            Register
                        </v-btn>
                        <div>
                            Already have an account? <VBtn variant="text" @click="step = 'login'">Log In</VBtn>
                        </div>
                    </template>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style>
    .v-overlay__content{
        top:5% !important;
        flex-wrap:wrap;
        align-content:center;
    }
</style>