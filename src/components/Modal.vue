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
					<th>Date</th>
					<th width="5">Message</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="i" v-for="(log, i) in job.logs">
					<th>{{ i+1 }}</th>
					<td>{{log.result}}</td>
					<td>{{log.date | formatDateTime}}</td>
					<td>
						<span class="button is-small" v-if="log.result === 'error'" @click="showLog(log)">
							<span class="icon"><i class="fa fa-list"></i></span>
						</span>
					</td>
				</tr>
			</tbody>
		</table>
		<p class="has-text-centered" v-else>No logs for this job</p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>

	<div class="modal" :class="{'is-active': logModal}">
        <div class="modal-background" @click="closeLog()"></div>
        <div class="modal-content">
            <div class="box">
                <pre>{{ log.stack }}</pre>
				<br />
                <a class="button is-danger" @click="closeLog()">Close</a>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeLog()"></button>
	</div>

	</div>
</template>

<script>

export default {
	name: 'modal',
	props: {
		job: Object,
		opened: Boolean,
	},
	data() {
		return {
			logModal: false,
			log: {}
		}
	},
	methods: {
		close() {
			this.$emit('close')
		},
		showLog(log) {
			this.log = log
			this.logModal = true
		},
		closeLog() {
			this.logModal = false
		}
	}
}
</script>

<style scoped>

</style>
