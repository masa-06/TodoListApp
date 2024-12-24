
const { createApp } = Vue;

// アプリケーションの作成とマウント
const app = createApp({
  data() {
    return {
      id: 0,
      inputTask: "",
      startScheduleDate: "",
      endScheduleDate: "",
      startAchievementDate: "",
      endAchievementDate: "",
      completed: false,
      taskList: []
    }
  },
  methods: {
    addTask() {
      if (!this.inputTask || !this.startScheduleDate || !this.endScheduleDate) {
        alert('全項目入力してください');
        return;
      }
      if (this.startScheduleDate > this.endScheduleDate) {
        alert('終了予定日付は開始予定日付より前にしてください');
        return;
      }
      this.taskList.push(
        {
          id: ++this.id,
          taskName: this.inputTask,
          startScheduleDate: this.startScheduleDate,
          endScheduleDate: this.endScheduleDate,
          startAchievementDate: this.startAchievementDate,
          endAchievementDate: this.endAchievementDate,
          completed: this.completed
        }
      )
      this.inputTask = ""
      this.startScheduleDate = ""
      this.endScheduleDate = ""
    },
    changeEvent(task) {
      console.log("task=" + task)
      if (task.startAchievementDate && task.endAchievementDate && task.startAchievementDate > task.endAchievementDate) {
        alert('終了実績日付は開始実績日付より前にしてください');
        task.completed = false; // チェックを外す
      }

    }
  }
});

// コンポーネントの定義
app.component('todo_component', {
  props: ["title", "tasks", "completed"],
  computed: {
    filteredTaskList() {
      return this.tasks.filter(task => task.completed === this.completed);
    }
  },
  template: `
  <h3>{{ title }}</h3>
  <table>
    <tr>
      <th>タスク名</th>
      <th>開始予定日付</th>
      <th>終了予定日付</th>
      <th>開始実績日付</th>
      <th>終了実績日付</th>
      <th>完了</th>
    </tr>
    <tr v-for="task in filteredTaskList" :key="task.id">
      <th>{{task.taskName}}</th>
      <th>{{task.startScheduleDate}}</th>
      <th>{{task.endScheduleDate}}</th>
      <th v-if="!(task.completed)"><input type="date" v-model="task.startAchievementDate" /></th>
      <th v-if="!(task.completed)"><input type="date" v-model="task.endAchievementDate" /></th>
      <th v-if="completed">{{task.startAchievementDate}}</th>
      <th v-if="completed">{{task.endAchievementDate}}</th>
      <th><input type="checkbox" v-model="task.completed" @change="changeEvent(task)"/></th>
    </tr>
  </table>
  `
})

app.mount('#app');