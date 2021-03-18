<template>
  <div class="q-ma-md">
    <q-card class="column q-ma-md">
      <div class="q-my-md text-h5 text-center">
        <div class="row q-gutter-xs justify-center items-center" v-if="!title.isEdit">
          <div>{{ title.content }}</div>
          <q-btn @click="editTitle" flat round color="primary" icon="create"/>
        </div>
        <div v-else class="row justify-center items-center">
          <q-input class="justify-center items-center" style="font-size: 20px" v-model="title.editContent"/>
          <q-btn @click="changeTitle(title.editContent)" flat round color="primary" icon="done"/>
          <q-btn @click="changeTitle(title.content)" flat round color="secondary" icon="clear"/>
        </div>
      </div>
      <div v-if="!subtitle.isEdit" class="q-ma-md">
        <le-preview class="row" hljs-css="agate" is-md :value="subtitle.content"></le-preview>
      </div>
      <div v-else class="q-ma-md">
        <le-editor class="le-editor" hljs-css="agate" v-model="subtitle.editContent" @save="markdownSave"></le-editor>
      </div>
      <div v-if="!subtitle.isEdit" class="q-ma-md">
        <q-btn label="编辑说明" @click="editSubtitle" flat color="primary" icon="create"/>
      </div>
      <div v-else class="q-pa-md q-gutter-md">
        <q-btn @click="changeSubtitle(subtitle.editContent)" flat label="保存" color="primary" icon="done"/>
        <q-btn @click="changeSubtitle(subtitle.content)" flat label="取消" color="secondary" icon="clear"/>
      </div>
      <q-separator></q-separator>
      <div class="q-ma-md q-gutter-md">
        <q-btn color="primary" @click="list.push(1)" label="添加文本框"/>
        <q-btn color="primary" @click="list.push(2)" label="添加单选"/>
        <q-btn color="primary" @click="list.push(3)" label="添加复选"/>
        <q-btn color="primary" @click="list.push(4)" label="添加文本区域"/>
        <q-btn color="primary" @click="list.push(5)" label="添加下拉菜单"/>
        <q-btn color="primary" @click="list.push(6)" label="上传表单"/>
        <q-btn color="primary" @click="list.push(7)" label="评分"/>
        <q-btn color="white" text-color="primary" @click="inline = !inline" label="是否行内"/>
        <q-btn color="white" text-color="primary" @click="list = []" label="重置"/>
      </div>
      <div class="q-ma-md" v-if="list.length === 0">
        <div class="text-center text-grey text-subtitle1">暂无问题，请点击上方按钮添加。</div>
      </div>
      <q-form @submit="onSubmit">
        <div v-for="(n, index) in list" v-bind:key="index">
          <SimpleTextField v-if="n === 1" title="姓名" v-bind:no="index"></SimpleTextField>
          <RadioField v-else-if="n === 2" title="你最喜欢的明星是？" v-bind:no="index" :content="radioList"
                      :inline="inline"></RadioField>
          <CheckBoxField v-else-if="n === 3" title="你的兴趣爱好" v-bind:no="index" :content="checkList"
                         :inline="inline"></CheckBoxField>
          <TextAreaField v-else-if="n === 4" title="你的意见" :no="index"></TextAreaField>
          <SelectBoxField v-else-if="n === 5" title="你的性别" :no="index" :content="selectList"></SelectBoxField>
          <FileUploadField v-else-if="n === 6" title="上传文件" :no="index"></FileUploadField>
          <RateField v-else-if="n === 7" title="你的评分" :no="index"></RateField>
        </div>
        <div class="q-ma-md">
          <q-btn label="提交" type="submit" color="primary"/>
        </div>
      </q-form>
      <q-separator></q-separator>
      <div class="q-my-md text-grey-7 text-subtitle2 text-center">Copyright @ notfound945 提供支持</div>
    </q-card>
  </div>
</template>

<script>

import SimpleTextField from 'components/SimpleTextField'
import RadioField from 'components/RadioField'
import CheckBoxField from 'components/CheckBoxField'
import TextAreaField from 'components/TextAreaField'
import SelectBoxField from 'components/SelectBoxField'
import FileUploadField from 'components/FileUploadField'
import RateField from 'components/RateField'

export default {
  name: 'Form',
  components: {
    RadioField,
    SimpleTextField,
    CheckBoxField,
    TextAreaField,
    SelectBoxField,
    FileUploadField,
    RateField
  },
  data () {
    return {
      result: 'jjj',
      title: {
        content: '表单测试',
        editContent: '',
        isEdit: false
      },
      subtitle: {
        content: '# 测试标题 \n+ 这是一个表单测试，所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。\n这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。\n\n+ 额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。\n如果你这样做了，Vue 会在浏览器的控制台中发出警告。',
        editContent: '# 测试标题 \n+ 这是一个表单测试，所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。\n这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。\n\n+ 额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。\n如果你这样做了，Vue 会在浏览器的控制台中发出警告。',
        isEdit: false
      },
      list: [],
      text_num: 0,
      radio_num: 0,
      inline: true,
      selectList: [
        '保密',
        '男',
        '女'
      ],
      radioList: [
        {
          label: '刘德华',
          value: 'ldh'
        },
        {
          label: '周杰伦',
          value: 'zjl'
        },
        {
          label: '张国荣',
          value: 'zgr'
        },
        {
          label: '谭咏麟',
          value: 'tyl'
        },
        {
          label: '陈百强',
          value: 'cbq'
        }
      ],
      checkList: [
        {
          label: '李白',
          value: 'lb'
        },
        {
          label: '杜甫',
          value: 'df'
        },
        {
          label: '王羲之',
          value: 'wxz'
        },
        {
          label: '孔子',
          value: 'kz'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    onSubmit (evt) {
      console.log('onSubmit ', evt.target)
    },
    // markdown 2 html
    markdownSave (val) {
      // 获取预览文本
      console.log(this.subtitle.editContent) // 这里是原markdown文本
      console.log(val) // 这个是解析出的html
    },
    editTitle () {
      this.title.isEdit = !this.title.isEdit
      this.title.editContent = this.title.content
    },
    editSubtitle () {
      this.subtitle.isEdit = !this.title.isEdit
      // this.subtitle.editContent = this.subtitle.content
    },
    changeTitle (newContent) {
      this.title.content = newContent
      this.title.isEdit = !this.title.isEdit
    },
    changeSubtitle (newContent) {
      this.subtitle.content = newContent
      this.subtitle.editContent = this.subtitle.content
      this.subtitle.isEdit = !this.subtitle.isEdit
      console.log(this.subtitle.content)
    }
  }
}
</script>

<style scoped>
.le-editor {
  height: 500px
}
</style>
