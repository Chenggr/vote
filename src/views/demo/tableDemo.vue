<template>
  <div>
    <div class="v-main"
         id="fixed">
      <div class="main_second">

        <SnbTable :headerFixed="{
        state: true
      }"
                  :data="tableData"
                  :sortState="sortState"
                  :defaultSort="defaultSort"
                  @sortChange="sortChange">
          <SnbTableColumn prop="name"
                          label="姓名"
                          fixed />
          <SnbTableColumn prop="gender"
                          label="性别"
                          :formatter="
          val => {
            return val === 'male' ? '男' : '女';
          }
        "
                          sortable />
          <SnbTableColumn prop="email"
                          label="邮箱"
                          width="20"
                          sortable />
          <SnbTableColumn prop="address"
                          label="地址" />
          <SnbTableColumn prop="address2"
                          label="地址2" />
          <SnbTableColumn prop="address3"
                          label="地址3" />
        </SnbTable>
      </div>
    </div>
  </div>
</template>
<script>
import { SnbTable, SnbTableColumn, SnbTableHeader } from 'vue-snb-table'
import _ from 'lodash'
export default {
  components: {
    SnbTable,
    SnbTableColumn,
    SnbTableHeader
  },
  mounted () {
    // this.isLeftScroll()
  },
  computed () {

  },
  methods: {
    isLeftScroll () {
      var windowHeight = $(window).height()
      var $body = $('body')
      let startX, startY, moveEndX, moveEndY
      $body.css('height', windowHeight) // 重要代码
      $('body').on('touchstart', function (e) {
        e.preventDefault()
        startX = e.originalEvent.changedTouches[0].pageX,
          startY = e.originalEvent.changedTouches[0].pageY
      })
      $('body').on('touchmove', function (e) {
        let X, Y
        e.preventDefault()
        moveEndX = e.originalEvent.changedTouches[0].pageX,
          moveEndY = e.originalEvent.changedTouches[0].pageY,
          X = moveEndX - startX,
          Y = moveEndY - startY

        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          console.log('left 2 right')
        } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          console.log('right 2 left')
          console.log(X)
          console.log(Y)
          document.querySelector('.ui-snb-table .table-fixed .table-fixed-top table ').style.visibility = 'hidden'
          document.querySelector('.ui-snb-table .table-fixed .table-fixed-left').style.zIndex = 30
        } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          console.log('top 2 bottom')
        } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          console.log('bottom 2 top')
          console.log(X)
          console.log(Y)
          document.querySelector('.ui-snb-table .table-fixed .table-fixed-top table ').style.visibility = 'visible'
          document.querySelector('.ui-snb-table .table-fixed .table-fixed-left').style.zIndex = 9
        } else {
          console.log('just touch')
        }
      })
    },

    // 数据排序
    sortChange (sort) {
      const order = sort.order === 'asc' ? 'desc' : 'asc'
      this.sortState = {
        prop: sort.prop,
        order: order
      }
      this.tableData = _.orderBy(
        this.tableData,
        this.sortState.prop,
        this.sortState.order
      )
    }
  },
  data () {
    return {
      headerColsWidth: ['20', '20', '20', '20'],
      sortState: {}, // 存储手动排序的结果
      defaultSort: {
        // 列表默认排序
        prop: '',
        order: ''
      },
      tableData: [
        {
          name: 'blanca hidalgo',
          gender: 'male',
          email: 'blanca.hidalgo@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'delphine fournier',
          gender: 'female',
          email: 'delphine.fournier@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'iiris hatala',
          gender: 'female',
          email: 'iiris.hatala@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'anastasia garcia',
          gender: 'male',
          email: 'anastasia.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        },
        {
          name: 'tanya johnston',
          gender: 'male',
          email: 'tanya.johnston.garcia@example.com',
          address: 'No. 189, Grove St, Los Angeles',
          address2: 'No. 189, Grove St, Los Angeles',
          address3: 'No. 189, Grove St, Los Angeles'
        }
      ]
    }
  }
}
</script>

<style>
.main_second {
  background-color: #999;
  height: 100%;
  overflow: auto;
}
p {
  line-height: 30px;
  font-size: 16px;
}
.title {
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
@media screen and (orientation: portrait) {
  .main {
    -webkit-transform: rotate(90deg) !important;
    -moz-transform: rotate(90deg) !important;
    -ms-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
    width: 100vh !important;
    height: 100vh !important;
    /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
    overflow: hidden !important;
  }
}
@media screen and (orientation: landscape) {
  .main {
    -webkit-transform: rotate(0) !important;
    -moz-transform: rotate(0) !important;
    -ms-transform: rotate(0) !important;
    transform: rotate(0) !important;
  }
}
</style>
