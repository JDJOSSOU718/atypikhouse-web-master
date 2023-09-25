<template>
  <span
    class="badge badge-pill"
    :class="`badge-${getGradeBadge(model.grade)}`"
  >
    <b>{{ getGradeName(model.grade) }}</b>
  </span>
</template>
<script>
import utils from '../../../mixins/utils'
export default {
  props: ['rowIndex', 'model'],
  name: 'gradeFormatedTemplate',
  mixins: [utils],
}
</script>