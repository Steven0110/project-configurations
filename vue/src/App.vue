<template lang="pug">
	v-app(id="alalza-app")
		v-content
			transition(name="slide-x-transition", mode="out-in")
				router-view

</template>