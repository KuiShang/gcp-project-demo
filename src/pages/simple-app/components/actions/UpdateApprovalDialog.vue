<template>
  <el-dialog title="更新报批情况" :visible.sync="dialog.visible" size="medium" destroy-on-close>
    <DataContext :readonly="false">
      <FormContainer ref="formContainer">
        <Section label="报出情况">
          <FieldGrid>
            <Field label="报出情况" prop="reportCase" type="enum" />
            <Field label="报出日期" prop="reportDate" type="date" format="date" />
            <Field label="报出金额" prop="reportAmount" :required="true" unit="元" format="money" type="number" />
            <Field
              label="报出预算文件"
              prop="reportBudgetAttachment"
              :help-tips="helpTips"
              :accept="accept"
              :multiple="true"
              col="3"
              limit="100"
              type="file"
            />
          </FieldGrid>
        </Section>

        <Section label="批复情况">
          <FieldGrid>
            <Field label="批复情况" prop="replyCase" type="enum" />
            <Field label="批复日期" prop="replyDate" type="date" format="date" />
            <Field label="批复金额" prop="replyAmount" :required="true" unit="元" format="money" type="number" />
            <Field
              label="批复预算文件"
              prop="replyBudgetAttachment"
              :help-tips="helpTips"
              :accept="accept"
              :multiple="true"
              col="3"
              limit="100"
              type="file"
            />
          </FieldGrid>
        </Section>
      </FormContainer>
    </DataContext>
    <template #footer>
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="confirm">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UpdateApprovalDialog',
  inject: ['dialog'],
  data() {
    return {
      uploadHelpTips: '支持上传word/pdf/jpg/png/jpeg等格式文件',
      acceptFileType: 'doc,docx.xls,xlsx,pdf,jpg,png,jpeg'
    }
  },
  methods: {
    ...mapActions(['updateApproval']),
    helpTips() {},
    accept() {},
    closeModal() {
      this.dialog.visible = false
    },

    async confirm() {
      const refForm = this.$refs.formContainer
      refForm.validate(async valid => {
        if (valid) {
          const params = {
            ...refForm.dataModel,
            _flags: {
              assigned: ['reportAmount', 'replyAmount']
            }
          }
          const code = await this.updateApproval(params)
          if (code === 200) {
            this.$message.success('保存成功!')
            this.closeModal()
            this.$store.dispatch('loadDetail', params._id)
          } else {
            this.$message.error('保存失败!')
          }
        }
      })
    }
  }
}
</script>
