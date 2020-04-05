<template>
  <div class="x-exercise-wrapper">
    <div class="x-exercise">
      <div class="view-hmc"
           v-if="isHmc == 'Y'">
        <div class="content">
          <div class="tip">
            <div class="title-b"><img class="must-icon-2"
                   src="../../assets/img/must-input.png" />{{title}}</div>
            <div v-for="tjs of hmcTjs"
                 :key="tjs.hmcTjId">
              {{tjs.hmcTjDesc}}
            </div>

          </div>
        </div>
        <div class="roster">
          <van-radio-group v-model="radioResult"
                           @change="rosterChange(radioResult)">
            <div class="hmc-info"
                 v-for="item of hmcInfos"
                 :key="item.name">

              <van-radio class="radio-style"
                         :name="item.name">{{item.name}}</van-radio>
              <SnbTable :data="item.tableVal"
                        :sortState="sortState">
                <SnbTableColumn prop="id"
                                label="序号" />
                <SnbTableColumn prop="name"
                                label="姓名" />
                <SnbTableColumn prop="unit"
                                label="单位" />
                <SnbTableColumn prop="position"
                                label="职位" />
                <SnbTableColumn prop="gender"
                                label="性别" />
                <SnbTableColumn prop="date"
                                label="出生日期"
                                width="20" />
                <SnbTableColumn prop="age"
                                label="年龄" />
              </SnbTable>
            </div>
          </van-radio-group>
        </div>
      </div>
      <div v-if="isHmc != 'Y'"
           class="exer-box">
        <div class="title">
          <span class="icon"
                v-if="isMust == 'Y'"> <img class="must-icon "
                 src="../../assets/img/must-input.png" /></span>
          <span class="title-b">{{title}}</span>
        </div>
        <div class="group-box">
          <van-radio-group class="group"
                           v-if="type == 'radio'"
                           v-model="radioResult"
                           @change="radioChange(radioResult)">
            <van-radio class="check-border"
                       :name="item.answerDesc"
                       v-for="item of itemList"
                       @click="clickModelRadio(item)"
                       :key="item.answerId">{{item.answerDesc}}</van-radio>
          </van-radio-group>
          <van-checkbox-group class="group"
                              v-if="type == 'checkbox'"
                              v-model="checkResult"
                              @change="checkboxChange(checkResult)">
            <div class="check-border"
                 v-for="item of itemList"
                 :key="item.answerId">
              <van-checkbox style=""
                            :name="item.answerDesc"
                            :ref="`list${item.answerId}`"
                            @click="clickModelCheck(item)"
                            shape="square">{{item.answerDesc}}

              </van-checkbox>
              <div v-if="item.isInput == 'Y' && item.isShowInput"
                   class="input-line">
                <div class="input-box">
                  <input type="text"
                         v-model="item.inputValue"
                         ref="inputEl"
                         id="dom"
                         class="otherInput ">
                </div>
              </div>
            </div>

          </van-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Checkbox,
  RadioGroup,
  Radio,
  CheckboxGroup
} from 'vant'
import { SnbTable, SnbTableColumn, SnbTableHeader } from 'vue-snb-table'
export default {
  name: 'Exercise',
  components: {
    VanCheckbox: Checkbox,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    VanCheckboxGroup: CheckboxGroup,
    SnbTable,
    SnbTableColumn,
    SnbTableHeader
  },

  computed: {

  },
  created () {

  },

  data () {
    return {
      radio: '',
      sortState: {},
      inputValue: '',
      isChecked: false,
      itemModel: false,
      isShowInput: false,
      radioResult: '',
      checkResult: [],
      resList: [],
      radioResultList: [],
      checkResultList: [],
      checkItem: {}  // 当前点击
    }
  },
  props: {
    hmcTjs: {
      type: Array,
      default: []
    },
    hmcInfos: {
      type: Array,
      default: []
    },
    isHmc: {
      type: String,
      default: 'N'
    },
    sort: {
      type: String,
      default: '-1'
    },
    id: {
      type: String,
      default: '000'
    },
    isMust: {
      type: String,
      default: 'N'
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: []
    }
  },
  mounted () {

  },
  methods: {

    clickModelRadio (item) {
      // 无法触发
      console.log('radio item: ', item)
    },
    clickModelCheck (item) {
      console.log('checkitem: ', item)
      this.checkItem = item

      let id = item.answerId
      setTimeout(() => {
        let flag = this.$refs[`list${id}`][0].$el.getAttribute('aria-checked')

        if (item.isInput === 'Y') {
          if (flag === 'true') {
            this.itemList[id - 1].isShowInput = true
          } else {
            this.itemList[id - 1].isShowInput = false
            this.itemList[id - 1].inputValue = ''
          }
        }
        this.$forceUpdate()
      }, 100)
    },

    rosterChange (radio) {
      let arr = []

      for (let i = 0; i < this.hmcInfos.length; i++) {
        if (this.hmcInfos[i].name === radio) {
          arr.push({ answerId: this.hmcInfos[i].answerId, answerQt: radio })
        }
      }

      this.radioResultList = arr
      console.log('this.sort: ', this.sort)
      this.$emit('radioChange', radio, this.id, this.sort, this.radioResultList)
    },
    radioChange (radio) {
      let arr = []

      for (let i = 0; i < this.itemList.length; i++) {
        if (this.itemList[i].answerDesc === radio) {
          arr.push({ answerId: this.itemList[i].answerId, answerQt: radio })
        }
      }

      this.radioResultList = arr
      console.log('this.sort: ', this.sort)
      this.$emit('radioChange', radio, this.id, this.sort, this.radioResultList)
    },

    checkboxChange (checkbox) {
      let arr = []

      for (let i = 0; i < this.itemList.length; i++) {
        for (let j = 0; j < checkbox.length; j++) {
          if (this.itemList[i].answerDesc === checkbox[j]) {
            arr.push({ answerId: this.itemList[i].answerId, answerQt: checkbox[j] })
          }
        }
      }

      this.checkResultList = arr

      console.log('this.itemList: ', this.itemList)
      console.log(' this.checkResultList: ', this.checkResultList)

      this.$emit('checkboxChange', checkbox, this.id, this.sort, this.checkResultList)
    }
  }
}
</script>

<style lang="less">
.x-exercise-wrapper {
  .table-wrapper {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    // overflow-scrolling: touch;
    // overflow-x: auto;
    // white-space: nowrap;
    // -webkit-overflow-scrolling: touch;
  }
  .group-box {
    margin-top: 10px;
    border: 0.5px solid #c8c9cc;

    .group {
      .check-border {
        border-bottom: 0.5px solid #c8c9cc;
      }
    }
    .check-border:last-child {
      border-bottom: none;
    }
  }
  .content {
    margin-top: 30px;
    padding: 0;
  }
  .roster {
    margin-top: 30px;
    .hmc-info {
      margin-top: 20px;
    }
  }
  .title-b {
    line-height: 30px;
    font-weight: bold;
    background: url("");
  }
  .ui-snb-table {
    font-size: 16px;
  }
  .ui-snb-table td .cell,
  .ui-snb-table th .cell {
    text-align: center;
  }
  .ui-snb-table thead th {
    background: rgb(232, 243, 251);
  }
}
.exer-box {
  margin-top: 40px;
}
.x-exercise {
  font-size: 16px;
  .must-icon-2 {
    display: inline-block;
    padding-right: 2px;
    width: 9px;
    height: 9px;
  }
  .must-icon {
    margin-top: 0; /*no*/

    display: inline-block;
    padding-right: 2px;
    width: 9px;
    height: 9px;
  }
  .exer {
    margin: 10px 0;
  }
  .van-radio,
  .van-checkbox {
    padding: 14px 10px;
  }
  .title {
    display: flex;
    align-items: flex-start;
    font-size: 16px;
    .icon {
      display: flex;
      align-items: center;
      width: 10px;
      height: 30px;
    }
  }
  .input-line {
    padding: 0 0 10px 0;
  }
  .input-box {
    border: 1px solid #b3b3b3;
    width: 80%;
    height: 38px;
    display: flex;
    align-items: center;
    margin: 0 10px 0 36px;
    box-sizing: border-box;
  }
  .otherInput {
    display: inline-block;
    height: 30px;
    width: 100%;
    line-height: 30px;
    margin: 0 10px;
    box-sizing: border-box;
  }
}
</style>