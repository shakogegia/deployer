<template>
  <div class="modal" :class="{'is-active': opened}">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
      <div class="box">
				<h1 class="title">Logs</h1>
				<h2 class="subtitle">{{ job.title }}</h2>
				<table v-if="job.logs && job.logs.length" class="table is-fullwidth">
					<thead>
						<tr>
							<th>#</th>
							<th>Result</th>
							<th>Message</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						<tr :key="i" v-for="(log, i) in job.logs">
							<th>{{ i+1 }}</th>
							<td>{{log.result}}</td>
							<td>-</td>
							<td>{{log.date | formatDateTime}}</td>
						</tr>
					</tbody>
				</table>
				<p class="has-text-centered" v-else>No logs for this job</p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
	</div>
</template>

<script>

export default {
	name: 'modal',
	props: {
    job: Object,
    opened: Boolean,
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style scoped>

</style>
