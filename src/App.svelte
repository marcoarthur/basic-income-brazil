<script>
	import QuestionList from './components/questionList.svelte';

	let list = [ 
		{ 
			question: "question A",
			text: "This is QA",
			type: "text",
			properties: {
				tip : "A tip",
			},
			answered: false
		},
		{
			question: "question B",
			text: "This is QB",
			type: "radio",
			properties: {
				choices: () => {
					return [ 'a','b', 'c', 'd', 'e'].map( (v) => [v, 'is ' + v] )
				},
				group: 'qq',
				tip: "A tip"
			},
			answered: false
		}
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
	<QuestionList {list} {pointer} />
</main>
