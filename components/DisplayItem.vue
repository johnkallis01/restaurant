<script setup>
const {item}=defineProps({item: {type: Object, required: true}});
const { formatPrice } = usePriceFormatter();
</script>
<template>
    <div class="container">
       <div class="item-title">
        <h4>{{item.name}}</h4>
        <div class="price">{{formatPrice(item.price)}}</div>
       </div>
       <div class="content">
            <div class="row">{{'quantity: ' +item.qty }}</div>
            <div class="row" v-if="item.options.length">
                <h4>{{ 'options: ' }}</h4>
                <div v-for="op in item.options">
                    <span>{{op.name + ": " }}</span>
                    <span>{{ op.choice.name }} {{ Number(op.choice.price) ? " "+formatPrice(op.choice.price): '' }}</span>
                </div>
            </div>
            <div class="row" v-if="item.addOns.length">
                <h4>{{ 'addOns: ' }}</h4>
                <div v-for="ao in item.addOns">
                    <span>{{ao.name}}</span>
                    <span>{{ Number(ao.price) ? " "+formatPrice(ao.price): '' }}</span>
                </div>
            </div>
            <div class="row" v-if="item.removes.length">
                <h4>{{ 'removes: ' }}</h4>
                <div v-for="r in item.removes">
                    <span>{{r.name}}</span>
                </div>
            </div>
       </div>
    </div>
</template>
<style scoped>
.content{
    margin-left: 10px;
}
.container{
    border: 3px solid black;

}
.item-title{
    padding: 5px;
    background-color: rgb(228, 234, 234);
}
</style>