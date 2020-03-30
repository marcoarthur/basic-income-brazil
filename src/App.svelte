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
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title">Basic Income Helper</h1>
			{#if pointer < list.length}
				<QuestionList {list} bind:pointer={pointer} />
			{:else}
				<div class="hero-body">
					<h1 class="title"> Completed !</h1>
					<QuestionTable questions={list} />
				</div>
			{/if}
</section>
