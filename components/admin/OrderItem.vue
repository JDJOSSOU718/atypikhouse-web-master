<template>
    <tr>
        <td class="name"><img :src="item.image" alt="image"> {{item.title}}</td>
        <td>${{item.price}}</td>
        <td>${{(item.price)}}</td>
        <td><span class="badge badge-primary">Reçu</span></td>
    </tr>
</template>

<script>
export default {
    props: ['item']
}
</script>