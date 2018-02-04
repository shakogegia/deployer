<template>
  <div>
		<div class="content">
				<button class="button" @click="addJob()">
					<span class="icon"><i class="fa fa-plus"></i></span>
					<span>Add job</span>
				</button>
		</div>

		<div class="job-container" v-for="(job, i) in server.jobs" :key="i">
			<job :job="job" :server="server" @remove="remove(job, $event)" @update="updateJob(job, $event)"></job>
		</div>

  </div>
</template>

<script>
import Job from './Job'
import uuidv1 from 'uuid/v1'

export default {
	name: 'jobs',
	components: {
    Job,
  },
  props: {
    server: Object,
	},
	methods: {
		update(server) {
			this.$emit('update', server)
		},
		updateJob(job) {
			const item = this.server.jobs.filter(item => item.id === job.id)[0]
      const i = this.server.jobs.indexOf(item)
      this.server.jobs[i] = job
			this.update(this.server)
		},
		addJob(){
			if(!this.server.jobs) {
				this.server.jobs = []
			}
			this.server.jobs.push({
				id: uuidv1(new Date()),
				title: `New Job ${this.server.jobs.length+1}`,
				collapse: true,
				isLoading: false,
				source: {
					branch: 'master'
				},
				slack: {
					token: ''
				},
			})
			this.update(this.server)
		},
		remove(job) {
			const item = this.server.jobs.filter(item => item.id === job.id)[0]
      const i = this.server.jobs.indexOf(item)
      this.server.jobs.splice(i, 1)
			this.update(this.server)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.job-container {
	margin-bottom: 50px;
}
</style>
