<template>
  <div class="app">
    <button :disabled="status"
            @click="addRecords(2000)">新增</button>
    <button :disabled="status"
            @click="addRecords(10000)">新增1W</button>
    <button :disabled="status"
            @click="updateRecords">更新出生日</button>
  </div>
</template>

<script>
import { KintoneRestAPIClient } from '@kintone/rest-api-client'

import Mock from 'mockjs'

export default {
  name: 'App',
  data() {
    return {
      client: null,
      Random: Mock.Random,
      recordsAdd: [],
      recordsUpdate: [],
      status: false,
    }
  },
  created() {
    this.client = new KintoneRestAPIClient({
      baseUrl: 'https://devcamp.cybozu.cn',
      auth: {
        username: 'cybozu0615',
        password: 'cybozu0615',
      },
    })
    console.log(process.env.USER_NAME)
    console.log(process.env)
    console.log()
  },
  methods: {
    addRecords(num) {
      this.status = true
      this.recordsAdd = []
      for (let i = 0; i < num; i += 1) {
        this.recordsAdd.push({
          name: {
            value: this.Random.cfirst() + this.Random.cname(),
          },
          sex: {
            value: this.Random.pick(['男', '女']),
          },
        })
      }
      this.client.record
        .addAllRecords({
          app: 386,
          records: this.recordsAdd,
        })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateRecords() {
      this.status = true
      this.recordsUpdate = []
      this.client.record
        .getAllRecords({
          app: 386,
        })
        .then((resp) => {
          for (let i = 0; i < resp.length; i += 1) {
            if (resp[i].birthDay.value === null) {
              this.recordsUpdate.push({
                id: resp[i].$id.value,
                record: {
                  birthDay: {
                    value: this.Random.date(),
                  },
                },
              })
            }
          }
          this.client.record
            .updateAllRecords({
              app: 386,
              records: this.recordsUpdate,
            })
            .then(() => {
              window.location.reload()
            })
        })
    },
  },
}
</script>

<style>
@import 'normalize.css';
@import 'app.css';
</style>
