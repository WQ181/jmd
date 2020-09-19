<template>
	<view>
		<uni-evaluate :list-data="evaluateData" :rate="rateData" />
	</view>
</template>

<script>
	import uniEvaluate from '../../components/evaluate/uni-evaluate.vue';
	import evaluateData from '../../common/list.js';
	export default {
		components: {
			uniEvaluate
		},
		data() {
			return {
				evaluateData: evaluateData,
				rateData: 4.6
			};
		},
		onLoad() {},
		methods: {}
	};
</script>

<style>

</style>
