<template>
  <div class="view-my-checkbox">
    <md-check-group v-model="checkList">
      <md-check-box name="fever">发热</md-check-box>
      <md-check-box name="cough">咳嗽</md-check-box>
      <md-check-box name="other">其他</md-check-box>
    </md-check-group>
  </div>

</template>

<script>

export default {
  name: 'MyCheckbox',
  props: {
    checkList: {
      type: Array,
      default: []
    }
  },
  components: {

  },
  data () {
    return {
      // checkList: []
    }
  }
}
</script>
<style lang="less">
.view-my-checkbox {
  .md-check-group {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .md-check-box {
    margin: 16px 20px;
    padding: 10px 12px;
    width: 36%;
    border: 1px solid #8d8e93;
    border-radius: 6px;
  }
  .md-check-box.is-checked {
    border: 1px solid #2f86f6;
    border-radius: 6px;
  }
}
</style>