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
					return [ 'a','b', 'c', 'd', 'e'].map( (v) => [v, 'is ' + v] )
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

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Question Flow</h1>
	{#if pointer < list.length}
		<QuestionList {list} bind:pointer={pointer} />
	{:else}
		<div>
			<h1> Completed !</h1>
			<QuestionTable questions={list} />
		</div>
	{/if}
</main>
