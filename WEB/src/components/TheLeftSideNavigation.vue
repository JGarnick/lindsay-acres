<script setup>
import {defineProps, defineEmits} from "vue"
let emits = defineEmits(['navigationMenuClosed'])
let props = defineProps({
    navigationMenu: Boolean,
    default: false
})

</script>

<template>
    <VNavigationDrawer  @update:model-value="$emit('navigationMenuClosed')" :model-value="props.navigationMenu" temporary :border="true" :elevation="10">
        <VContainer>
            <RouterLink active-class="font-weight-bold" to="lists">Lists</RouterLink>
        </VContainer>
    </VNavigationDrawer>
</template>

<style scoped>
/* a{font-size:20px;color:white;} */
</style>