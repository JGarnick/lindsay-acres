<script setup>
import {useRouter} from "vue-router"
import { useUsersStore } from '../stores/users'
import TheLoginModal from "./TheLoginModal.vue";
const usersStore = useUsersStore()

let router = useRouter()
let props = defineProps({
  navigation: Boolean
})

let emits = defineEmits(['navigationChange'])

</script>
<template>
    <VAppBar>
      <VAppBarTitle style="cursor:pointer" @click="router.push('/')">Lindsay Acres</VAppBarTitle>
      <template v-slot:append>
        <!-- TODO automatically pull in a user using a token stored in cookies-->
        <TheLoginModal class="mr-3" v-if="!usersStore.user?.id"></TheLoginModal>
        <v-btn plain v-else>
            <v-avatar v-if="usersStore.user?.id && usersStore.user?.avatar" :image="usersStore.user.avatar"></v-avatar>
            <v-menu location="bottom">
              <template v-slot:activator="{ props }">
                  {{ usersStore.user.name }}
              </template>
              <v-list>
                <v-list-item>
                  <v-btn variant="text">Logout</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-btn>
      </template>
      
      <!-- <VAppBarNavIcon @click="$emit('navigationChange')"></VAppBarNavIcon> -->
    </VAppBar>
</template>

<style>
.v-toolbar-title{flex:none !important;margin-right:1em}
</style>