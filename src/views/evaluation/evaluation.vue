<template>
  <div class="view-eval">
    <div class="content">
      <div class="title-top">{{modelSxDesc}}</div>

      <div class="exercise-box">
        <x-exercise :key="item.id"
                    :isHmc="item.isHmc"
                    :hmcTjs="item.hmcTjs"
                    :hmcInfos="item.hmcInfos"
                    v-for="item of questions"
                    :title="item.questionDesc"
                    :id="item.questionId"
                    :sort="item.questionSort"
                    :isMust="item.isMust"
                    :type="item.questionType"
                    :itemList="item.answers"
                    @radioChange="radioChange"
                    @checkboxChange="checkboxChange"></x-exercise>

      </div>
      <div class="btn-box">
        <van-button type="info"
                    @click="submit"
                    size="large">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Dialog } from 'vant'
import { Toast } from 'mand-mobile'
import Exercise from '../components/Exercise'

export default {
  name: 'Boot',
  components: {
    VanButton: Button,
    xExercise: Exercise
  },
  data () {
    return {
      inputFlag: true,
      questionIdArr: [],
      isHasQuestionId: false,
      questionsResult: [],
      modelSxDesc: '',
      questions: [],
      params: {}
    }
  },
  created () {
    this.getParams()
  },
  methods: {
    getParams () {
      console.log(this.$route)
      this.params = this.$route.params
      this.modelSxDesc = this.params.modelSxDesc
      this.questions = this.params.questions
    },
    radioChange (radio, id, sort, radioResultList) {
      this.isHasIdFn(id)
      if (this.questionsResult.length > 0) {
        this.questionsResult.forEach((item, index) => {
          if (item.questionId === id) {
            item.answers = radioResultList
          } else {
            if (!this.isHasQuestionId) {
              let obj = {
                questionId: id,
                questionSort: sort,
                answers: radioResultList
              }
              this.questionsResult.push(obj)
              this.isHasQuestionId = true
            }
          }
        })
      } else {
        let obj = {
          questionId: id,
          questionSort: sort,
          answers: radioResultList
        }
        this.questionsResult.push(obj)
      }

      console.log('this.questionsResult: ', this.questionsResult)
    },
    isHasIdFn (id) {
      if (this.questionIdArr.indexOf(id) !== -1) {
        this.isHasQuestionId = true
      } else {
        this.isHasQuestionId = false
        this.questionIdArr.push(id)
      }
    },
    checkboxChange (checkbox, id, sort, checkResultList) {
      this.isHasIdFn(id)
      console.log('isHasQuestionId: ', this.isHasQuestionId)
      if (this.questionsResult.length > 0) {
        this.questionsResult.forEach((item, index) => {
          if (item.questionId === id) {
            item.answers = checkResultList
          } else {
            if (!this.isHasQuestionId) {
              let obj = {
                questionId: id,
                questionSort: sort,
                answers: checkResultList
              }
              this.questionsResult.push(obj)
              this.isHasQuestionId = true
            }
          }
        })
      } else {
        let obj = {
          questionId: id,
          questionSort: sort,
          answers: checkResultList
        }
        this.questionsResult.push(obj)
      }

      console.log('this.questionsResult: ', this.questionsResult)
    },
    // 取出两个数组的不同元素
    getArrDifference (arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    validate () {
      // 判断是否必填
      let mustId = []   // 必填的序号组
      let mustRes = []    // 选中的序号组
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].isMust === 'Y') {
          mustId.push(this.questions[i].questionSort)
        }
      }
      console.log('mustId: ', mustId)
      if (this.questionsResult.length > 0) {
        for (let j = 0; j < mustId.length; j++) {
          this.questionsResult.forEach(item => {
            if (item.questionSort === mustId[j]) {
              mustRes.push(item.questionSort)
            }
          })
        }

        console.log('mustRes: ', mustRes)
        if (mustRes.toString() !== mustId.toString()) {
          let diffArr = this.getArrDifference(mustRes, mustId)
          let info = '第' + diffArr[0] + '题为必填'
          Toast.info(info)
          return false
        }
        return true
      } else {
        Toast.info('您未选择,不能提交')
        return false
      }
    },
    getInputValue () {
      this.inputFlag = true
      this.questions.forEach((item) => {
        item.answers.forEach((ele) => {
          if (ele.isInput === 'Y') {
            if (ele.isShowInput && !ele.inputValue) {
              this.inputFlag = false
              Toast.info('输入框未填写值')
              return
            }
            if (ele.inputValue) {
              this.questionsResult.forEach((ques) => {
                if (ques.questionId === item.questionId) {
                  ques.answers.forEach((ans) => {
                    if (ans.answerId === ele.answerId) {
                      ans.answerQt = ele.inputValue
                    }
                  })
                }
              })
            }
          }
        })
      })
    },
    submit () {
      console.log('this.questions: ', this.questions)
      this.getInputValue()
      console.log('this.inputFlag: ', this.inputFlag)
      if (this.inputFlag && this.validate()) {
        console.log('last questionsResult: ', this.questionsResult)
        Dialog({ message: '已提交,谢谢参与' })
      }
    }

  }
}
</script>
<style lang="less">
.view-eval {
  position: fixed;
  height: 100%;
  background: #fff;
  .title-top {
    font-size: 20px;
    font-weight: bold;
    padding-top: 17px;
    text-align: center;
  }
  .content {
    padding: 0 24px;
  }
  .btn-box {
    padding: 80px 0 40px 0;
  }
}
</style>