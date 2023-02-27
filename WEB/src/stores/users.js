import { defineStore } from 'pinia'

const defaultState = {
    users: [],
    user: {}
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],
        user: {}
    }),
})