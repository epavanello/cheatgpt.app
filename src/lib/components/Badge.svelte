<script lang="ts">
	import classNames from "classnames";


	let classes: string | undefined = undefined;
	export { classes as class };
</script>

<span class={classNames('badge badge-lg', classes)}><slot /></span>
