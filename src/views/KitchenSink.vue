<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// // Router
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

// Type declarations
import type { ComputedRef } from 'vue'

// Components
import BaseIcon from '@/components/BaseIcon.vue'

// Definitions
const vmDemo = ref<string>('')
</script>

<template>
	<h1>Header 1</h1>
	<h2>Header 2</h2>
	<h3>Header 3</h3>
	<h4>Header 4</h4>

	<hr />

	<p class="xlarge">
		<b>This is an extra-large paragraph:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum
		aliquam in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et
		turpis a ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada.
		Pellentesque efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut
		facilisis. Sed non aliquam erat.
	</p>
	<p class="large">
		<b>This is a large paragraph:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum aliquam
		in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et turpis a
		ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada. Pellentesque
		efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut facilisis. Sed
		non aliquam erat.
	</p>
	<p>
		<b>This is a regular paragraph:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum aliquam
		in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et turpis a
		ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada. Pellentesque
		efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut facilisis. Sed
		non aliquam erat.
	</p>
	<p class="small">
		<b>This is a small paragraph:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum aliquam
		in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et turpis a
		ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada. Pellentesque
		efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut facilisis. Sed
		non aliquam erat.
	</p>
	<p class="xsmall">
		<b>This is a extra-small paragraph:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum
		aliquam in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et
		turpis a ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada.
		Pellentesque efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut
		facilisis. Sed non aliquam erat.
	</p>

	<hr />

	<h4>Header + paragraph</h4>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum aliquam in sapien egestas volutpat.
		Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et turpis a ipsum ullamcorper convallis ut a leo. Sed
		malesuada quam ullamcorper nunc venenatis, id sagittis purus malesuada. Pellentesque efficitur rhoncus dolor ut luctus. Ut libero diam,
		convallis ut neque et, molestie convallis ligula. Cras feugiat quis odio ut facilisis. Sed non aliquam erat.
	</p>

	<hr />

	<details>
		<summary>Collapsable section</summary>
		<div>Content</div>
	</details>

	<hr />

	<cv-text-input label="Text input" placeholder="placeholder" v-model="vmDemo"></cv-text-input>
	<cv-button>Primary</cv-button>
	<cv-button kind="secondary">Secondary</cv-button>
	<cv-button kind="tertiary">Tertiary</cv-button>

	<hr />

	<div>Large icons</div>
	<br />
	<BaseIcon icon="icn-terminal" size="large" />
	<BaseIcon icon="icn-arrow-right" size="large" />
	<BaseIcon icon="icn-caret-right" size="large" />
	<BaseIcon icon="icn-bookmark" size="large" />

	<br /><br /><br /><br />

	<div>Small icons</div>
	<br />
	<BaseIcon icon="icn-terminal" />
	<BaseIcon icon="icn-arrow-right" />
	<BaseIcon icon="icn-caret-right" />
	<BaseIcon icon="icn-bookmark" />

	<hr />
</template>

<style scoped lang="scss">
.bx--form-item {
	// flex: 0;
}
</style>
