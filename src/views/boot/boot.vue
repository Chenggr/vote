<template>
  <div class="view-boot">
    <div>
      <div class="content">
        <div class="title-top">民主推荐</div>
        <div class="tip">
          <div class="line-1"><img class="must-icon"
                 src="../../assets/img/must-input.png" />1、候选人名单及资格条件如下，请选择拟认【中层管理副职】推荐人选：</div>
          <div>（一）一般应具有大学本科以上学历，5年及以上金融或相关工作经历，2年以上基层工作经历；</div>
          <div>（二）须在基层管理正职及以上职位任职的经历；</div>
          <div>（三）近三年年度绩效考核结果为B及以上，且至少一年为A+或A。或有两年为B+；</div>
          <div>（四）无影响职位晋升的组织处理或处分情况。</div>
        </div>
      </div>
      <div class="roster">
        <van-radio-group v-model="radio"
                         @change="firstChange">
          <div v-for="item of hmcList"
               :key="item.id">
            <van-radio class="radio-style"
                       :name="item.name">{{item.name}}</van-radio>
            <SnbTable :data="item.tableData"
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
      <div class="exercise-box padd">
        <x-exercise :key="item.id"
                    v-for="item of dataList"
                    :title="item.title"
                    :type="item.type"
                    :isRequired="item.isRequired"
                    :id="item.id"
                    :itemList="item.items"
                    @radioChange="radioChange"
                    @checkboxChange="checkboxChange"></x-exercise>
      </div>
      <div class="btn-box padd">
        <van-button type="info"
                    @click="submit"
                    size="large">提交</van-button>
      </div>

    </div>
  </div>
</template>
<script>
import Exercise from '../components/Exercise'
import { Toast } from 'mand-mobile'
import { SnbTable, SnbTableColumn, SnbTableHeader } from 'vue-snb-table'
import {
  Checkbox,
  RadioGroup,
  Radio,
  Dialog,
  Button
} from 'vant'
export default {
  name: 'Boot',
  components: {
    VanButton: Button,
    xExercise: Exercise,
    VanCheckbox: Checkbox,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    SnbTable,
    SnbTableColumn,
    SnbTableHeader
  },
  data () {
    return {
      preventUCDefault: {},
      sortState: {}, // 存储手动排序的结果
      radio: '',
      firstIsMustInput: true,
      resultList: [],
      firstRequired: true,
      hmcList: [
        {
          id: '1',
          name: '张三丰',
          tableData: [
            {
              id: '1',
              name: '张三丰',
              unit: 'xx团队部门',
              position: '副总经理',
              gender: '男',
              date: '1959年5月',
              age: '53'
            }
          ]
        },
        {
          id: '2',
          name: '黄药师',
          tableData: [
            {
              id: '2',
              name: '黄药师',
              unit: 'xx团队部门',
              position: '副总经理',
              gender: '男',
              date: '1959年5月',
              age: '53'
            }
          ]
        },
        {
          id: '3',
          name: '周伯通',
          tableData: [
            {
              id: '3',
              name: '周伯通',
              unit: 'xx团队部门',
              position: '副总经理',
              gender: '男',
              date: '1959年5月',
              age: '53'
            }
          ]
        },
        {
          id: '4',
          name: '爱新觉罗',
          tableData: [
            {
              id: '4',
              name: '爱新觉罗',
              unit: 'xx团队部门',
              position: '副总经理',
              gender: '男',
              date: '1959年5月',
              age: '53'
            }
          ]
        }
      ],

      dataList: [
        {
          id: '2',
          isRequired: true,
          title: '2、推荐人选优点（请勾选3-5项）',
          type: 'checkbox',
          items: [
            { val: '1、思想政治素质较好' },
            { val: '2、全局意识大局观念强' },
            { val: '3、团结协作精神强' },
            { val: '4、开拓创新意识强' },
            { val: '5、作风民主，善于听取意见' },
            { val: '6、善学习，知识全，适应能力强' },
            { val: '7、专业技能强，实践经验丰富' },
            { val: '8、决策及时、准确、果断' },
            { val: '9、领导和驾驭能力强' },
            { val: '10、沟通协调能力强' },
            { val: '11、工作思路宽，预见性强' },
            { val: '12、工作务实，勤奋敬业' },
            { val: '13、有魄力，敢于管理' }
          ]
        },
        {
          id: '3',
          title: '3、请根据实际情况勾选推荐人选确定:【多选题】',
          type: 'checkbox',
          items: [
            { val: '1、工作思路不够开阔' },
            { val: '2、须加强对新业务的学习' },
            { val: '3、缺乏基层、一线工作经验' },
            { val: '4、创新精神有一定欠缺' },
            { val: '5、魄力不足，管理力度有待加强' },
            { val: '6、沟通协调能力有所欠缺' },
            { val: '7、比较固执，较难听取不同意见' },
            { val: '8、工作方法简单，管理艺术有待锤炼' },
            { val: '9、存在推诿扯皮现象' }
          ]

        }
      ]
    }
  },
  mounted () {

  },
  methods: {

    firstChange (val) {
      this.resultList[0] = val
      console.log(this.resultList)
    },
    radioChange (radio, id) {
      console.log(radio)
      this.resultList[id - 1] = radio
      console.log(this.resultList)
    },
    checkboxChange (checkbox, id) {
      console.log(checkbox)
      this.resultList[id - 1] = checkbox
      console.log(this.resultList)
    },
    validateFirst () {  // 检验第一题
      if (this.firstRequired) {
        if (!this.resultList[0]) {
          let info = '第1题为必填'
          Toast.info(info)
          return false
        }
      }
      return true
    },
    validate () {
      // 判断是否必填
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].isRequired) {
          if (!this.resultList[this.dataList[i].id - 1]) {
            let info = '第' + this.dataList[i].id + '题为必填'
            Toast.info(info)
            return false
          }
        }
      }
      return true
    },
    submit (val) {
      console.log(this.resultList)
      if (this.validateFirst() && this.validate()) {
        Dialog({ message: '已提交,谢谢参与' })
      }
    }
  }
}
</script>
<style lang="less">
.view-boot {
  position: fixed;
  height: 100%;
  background: #fff;
  .table-wrapper {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    // overflow-scrolling: touch;
    // overflow-x: auto;
    // white-space: nowrap;
    // -webkit-overflow-scrolling: touch;
  }
  .must-icon {
    display: inline-block;
    padding-right: 2px;
    width: 9px;
    height: 9px;
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
  .radio-style {
    margin: 30px 34px 20px 34px;
    font-size: 16px;
  }
  .padd {
    margin: 0 24px;
  }
  .content {
    padding: 0 24px;
  }

  .title-top {
    font-weight: bold;
    font-size: 20px;
    padding-top: 17px;
    text-align: center;
  }
  .tip {
    padding: 8px 0;
    font-size: 16px;
    letter-spacing: 0.39px;
    line-height: 31px;
    .line-1 {
      font-weight: 500;
    }
  }
  .roster {
    .title {
      font-size: 16px;
      text-align: left;
    }
    .img-box {
      margin-top: 10px;
      width: 100%;
      min-height: 90px;
      // background: url(../../assets/img/1585729410460.jpg) no-repeat;
      background-size: 100% 100%;
    }
  }
  .btn-box {
    padding: 80px 0 40px 0;
  }
}
</style>