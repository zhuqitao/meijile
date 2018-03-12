<template>
  <div @click="clickButton({sourceClientId: '11',targetClientId: '1',msgType: 'chat',msgContent: '2'})">
    <Table></Table>
  </div>
</template>
<script>
// import Table from 'iview/src/components/table'
export default {
  data () {
    return {
      tableData3: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          date: '2016-10-03'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04'
        }
      ],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: 'default'
    }
  },
  methods: {
    clickButton: function (val) {
        // $socket is socket.io-client instance
      this.$socket.emit('messageevent', val)
    }
  },
  computed: {
  }
  // components: {
  //   eleTable: Table
  // }
}
</script>
