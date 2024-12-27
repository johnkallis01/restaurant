<script setup>
const router = useRouter();
const props = defineProps({
    menu:{
        type: Object,
        required: true
    }
});
const newSectionDialog = ref(false);
const recieveDialogFlag = (sectionData) => {
    props.menu.sections.push(sectionData.section);
    newSectionDialog.value=sectionData.flag;
};
</script>
<template>
    <v-card>
        <v-card-title>
            <span class="title-text">{{ menu.name }}</span>
            <span class="btn-group">
                <v-btn text="edit" flat append-icon="mdi-file-edit"/>
                <v-btn text="Section +" flat @click="newSectionDialog=true"/>
            </span>
        </v-card-title>
        <v-card-item v-for="(section, i) in menu.sections" :key="i">
            {{ section.name }}
        </v-card-item>
        <v-dialog v-model="newSectionDialog" class="section-dialog">
            <v-card>
                <SectionDialog :menu="menu" @getDialogFlag="recieveDialogFlag"/>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<style scoped>
.v-card-title{
    display: flex;
    background-color: white;
    border: 2px solid black;
    color: black;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
}
.section-dialog{
    width: 60vw;
}
.btn-group{
    position: absolute;
  right: 0
}
.title-text{
    position: absolute;
    left: 50%;
}
</style>