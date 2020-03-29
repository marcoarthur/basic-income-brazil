<script>
	import QuestionList from './components/questionList.svelte';
	import QuestionTable from './components/questionTable.svelte';

	let list = [ 
		{ 
			question: "question A",
			text: "Question A ?",
			type: "text",
			properties: {
				tip : "A tip",
			},
			answered: false
		},
		{
			question: "question B",
			text: "Question B ?",
			type: "radio",
			properties: {
				choices: () => {
					return [ 'a','b', 'c', 'd', 'e'].map( (v) => ( { value: v, label: 'is ' + v } ) )
				},
				group: 'qq',
				tip: "A tip"
			},
			answered: false
		},
		{ 
			question: "question C",
			text: "Question C ?",
			type: "text",
			properties: {
				tip : "A tip",
			},
			answered: false
		},
	];

	let pointer = 0;
	list.map( (e,i) => { e.active = pointer == i })
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
		<!--
	<link rel="stylesheet" href="https://gist.githubusercontent.com/zaydek/6b2e55258734deabbd2b4a284321d6f6/raw/eb3bfc511ae856d479bb2e119a35bcf10d82da97/debug-v3.css">
		-->
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title">Basic Income Helper</h1>
			{#if pointer < list.length}
				<QuestionList {list} bind:pointer={pointer} />
			{:else}
				<div>
					<h1 class="title"> Completed !</h1>
					<QuestionTable questions={list} />
				</div>
			{/if}
</section>
