<script setup>
import { useRouter } from "vue-router"
import { defineEmits } from "vue"
import { useUsersStore } from '../stores/users'
import TheLoginModal from "./TheLoginModal.vue";
import { checkForUserCookie, logout } from "../services/auth"

const usersStore = useUsersStore()

checkForUserCookie(usersStore)

let router = useRouter()

let emits = defineEmits(['navigationMenuChange'])

function attemptLogout(){
  let result = logout(usersStore)
}

</script>
<template>
    <VAppBar>
      <VAppBarTitle style="cursor:pointer" @click="router.push('/')">Lindsay Acres</VAppBarTitle>
      <template v-slot:append>
        <TheLoginModal class="mr-3" v-if="!usersStore.user?.id"></TheLoginModal>
        <v-btn plain v-else>
            <v-avatar v-if="usersStore.user?.id && usersStore.user?.avatar" :image="usersStore.user.avatar"></v-avatar>
            <v-menu>
              <template v-slot:activator="{ props }">
                  <span variant="text" v-bind="props">
                    {{ usersStore.user.name }}
                  </span>
              </template>
              <v-list>
                <v-list-item>
                  <v-btn @click="attemptLogout" variant="text">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-btn>
      </template>
      
      <VAppBarNavIcon @click="$emit('navigationMenuChange')"></VAppBarNavIcon>
    </VAppBar>
</template>

<style>
.v-toolbar-title{flex:none !important;margin-right:1em}
</style>