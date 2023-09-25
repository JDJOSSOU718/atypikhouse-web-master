<template>
  <span
    class="badge badge-pill"
    :class="`badge-${getStatusBadge(model.status)}`"
  >
    <b>{{ getStatusName(model.status) }}</b>
  </span>
</template>
<script>
import utils from '../../../mixins/utils'
export default {
  props: ['rowIndex', 'model'],
  name: 'StatusFormatedTemplate',
  mixins: [utils],
}
</script>