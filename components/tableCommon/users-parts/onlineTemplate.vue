<template>
  <span
    class="badge badge-pill"
    :class="`badge-${getOnlineBadge(model.is_online)}`"
  >
    <b>{{ getOnlineName(model.is_online) }}</b>
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