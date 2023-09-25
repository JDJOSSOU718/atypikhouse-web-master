<template>
  <i
    :class="`fa fa-lg ${model.icon}`"
  >
   
  </i>
</template>
<script>
export default {
  props: ['rowIndex', 'model'],
}
</script>