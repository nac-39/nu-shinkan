<script setup lang="ts">
const tooltip = ref(false)

// const
const cancelTooltip = () => {
  tooltip.value = false
  const tt = document.querySelector('.tooltiptext')
  if (tt) tt.innerHTML = `Copy to clipboard`
}
const copyBash = () => {
  const bash = 'git clone https://github.com/viandwi24/nuxt3-awesome-starter'
  navigator.clipboard.writeText(bash)
  tooltip.value = true
  const tt = document.querySelector('.tooltiptext')
  if (tt) tt.innerHTML = `Copied!!!`
}
</script>

<template>
  <div class="ml-4 w-100 z-10 h-auto shadow">
    <div
      class="win-header bg-gray-200 dark:bg-slate-800 flex flex space-x-4 px-3 py-2 rounded-t-lg relative border-b-2 border-gray-300/75 dark:border-slate-700/75"
    >
      <div class="win-controls flex space-x-1 items-center">
        <div class="w-3 h-3 bg-red-500 rounded-full" />
        <div class="w-3 h-3 bg-green-500 rounded-full" />
        <div class="w-3 h-3 bg-yellow-500 rounded-full" />
      </div>
      <div class="flex-1 font-bold text-center pr-12 text-sm">BASH</div>
      <div class="text-sm flex justify-center items-center">
        <div class="tooltip">
          <button
            class="text-gray-100 flex justify-center items-center"
            @click="copyBash"
            @mouseout="cancelTooltip"
          >
            <span class="tooltiptext">Copy to clipboard</span>
            <icon-material-symbols:content-copy-outline />
          </button>
        </div>
      </div>
    </div>
    <div
      class="win-body rounded-b-lg bg-gray-200/90 dark:bg-slate-800/90 px-3 py-2 font-mono backdrop-filter backdrop-blur-lg"
    >
      <div>$ git clone https://github.com/viandwi24/nuxt3-awesome-starter</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
